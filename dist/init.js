'use strict';

var config = require('config');

var util = require('util');

var SPI = require('spi');
var note = require('note-log');
var ws281x = require('rpi-ws281x-native');
var SerialPort = require('serialport');

var chipMap = require('./chipMap.js');

var chips = {};

chips.ws2801 = function (leds) {
  leds.spi = new SPI.Spi('/dev/spidev0.0', {
    mode: SPI.MODE['MODE_0'],
    chipSelect: SPI.CS['none']
  }, function (s) {
    s.open();
  });
};

chips.ws281x = function (leds) {
  ws281x.init(leds.pixels.length);
};

chips.usb = function (leds) {
  leds.usb = new SerialPort(config.usb.path, config.usb);

  leds.usb.open();

  leds.usb.on('data', function (data) {
    note(data.toString());
  });

  leds.usb.on('error', note);
};

module.exports = function () {
  var size = config.get('size');
  var length = Array.isArray(size) ? size[0] * size[1] : size;

  var leds = {};

  leds.chip = chipMap(config.chip);

  var init = chips[leds.chip];

  if (!init) {
    throw new Error('Chip not supported');
  }

  leds.pixels = Array.apply(null, Array(length)).map(function (pixel, index) {
    var x = void 0,
        y = void 0;

    if (Array.isArray(size)) {
      y = Math.floor(index / size[1]);

      if (config.zigzag && y % 2 === 0) {
        x = index % size[0];
      } else {
        x = size[0] - 1 - index % size[0];
      }
    } else {
      y = 0;
      x = index;
    }

    return {
      values: [0, 0, 0],
      index: index,
      x: x,
      y: y
    };
  });

  leds.beat = 0;
  leds.interval = 30;

  leds.mode = 'hsv';

  init(leds);

  return leds;
};