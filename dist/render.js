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
    acc.push('0x' + Number(pixel.values[r] & 0xff).toString(16), '0x' + Number(pixel.values[g] & 0xff).toString(16), '0x' + Number(pixel.values[b] & 0xff).toString(16));

    return acc;
  }, []);

  leds.spi.write(new Buffer(data));
};

chips.ws281x = function (leds) {
  var data = leds.pixels.reduce(function (acc, pixel) {
    acc.push(((pixel.values[r] & 0xff) << 16) + ((pixel.values[g] & 0xff) << 8) + (pixel.values[b] & 0xff));

    return acc;
  }, []);

  ws281x.render(new Uint32Array(data));
};

chips.usb = function (leds) {
  if (leds.usb.isOpen()) {
    var data = leds.pixels.reduce(function (acc, pixel) {
      acc.push('0x' + Number(pixel.values[r] & 0xff).toString(16), '0x' + Number(pixel.values[g] & 0xff).toString(16), '0x' + Number(pixel.values[b] & 0xff).toString(16));

      return acc;
    }, []);

    leds.usb.write(new Buffer(data));
  }
};

module.exports = function (leds) {
  var render = chips[leds.chip];

  if (!render) {
    throw new Error('Chip not supported');
  }

  render(leds);
};