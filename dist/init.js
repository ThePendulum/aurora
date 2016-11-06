'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');
var SPI = require('spi');

var chipMap = require('./chipMap.js');

module.exports = function () {
  var size = config.size;
  var zigzag = config.zigzag === undefined ? true : config.zigzag;

  var leds = {};
  var length = void 0;

  leds.chip = chipMap(config.chip);

  if (Array.isArray(size)) {
    leds.width = size[0];
    leds.height = size[1];

    length = size[0] * size[1];
  } else {
    leds.width = size;
    leds.height = 1;

    length = size;
  }

  leds.pixels = Array.from({ length: length }, function (pixel, index) {
    var x = void 0,
        y = void 0;

    if (Array.isArray(size)) {
      y = Math.floor(index / leds.height);

      if (zigzag && y % 2 === 0) {
        x = index % leds.width;
      } else {
        x = leds.width - 1 - index % leds.width;
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

  return leds;
};