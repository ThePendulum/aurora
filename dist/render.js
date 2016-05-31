'use strict';

var config = require('config');
var util = require('util');
var note = require('note-log');

var ws281x = require('rpi-ws281x-native');

var chips = {};

var colorIndex = config.has('colorIndex') ? config.get('colorIndex') : [0, 1, 2];

var r = colorIndex[0];
var g = colorIndex[1];
var b = colorIndex[2];

chips.ws2801 = function (leds) {
  var data = leds.pixels.reduce(function (acc, pixel) {
    return acc.concat('0x' + Number(pixel.values[r] & 0xff).toString(16), '0x' + Number(pixel.values[g] & 0xff).toString(16), '0x' + Number(pixel.values[b] & 0xff).toString(16));
  }, []);

  leds.spi.write(new Buffer(data));
};

chips.ws281x = function (leds) {
  var data = leds.pixels.reduce(function (acc, pixel) {
    return acc.concat(((pixel.values[r] & 0xff) << 16) + ((pixel.values[g] & 0xff) << 8) + (pixel.values[b] & 0xff));
  }, []);

  ws281x.render(new Uint32Array(data));
};

chips.ws2811 = chips.ws281x;
chips.ws2812 = chips.ws281x;
chips.ws2812b = chips.ws281x;

var render = chips[config.get('chip').toLowerCase()];

if (!render) {
  throw new Error('Chip not supported');
}

module.exports = function (leds) {
  render(leds);
};