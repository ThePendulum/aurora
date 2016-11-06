'use strict';

var config = require('config');

var colorIndex = config.colorIndex || [0, 1, 2];

var r = colorIndex[0];
var g = colorIndex[1];
var b = colorIndex[2];

var each = function each(pixel, leds, pre, init) {
  pre.push('0x' + Number(pixel.values[r] & 0xff).toString(16), '0x' + Number(pixel.values[g] & 0xff).toString(16), '0x' + Number(pixel.values[b] & 0xff).toString(16));

  return pixel.values;
};

module.exports = each;