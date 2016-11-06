'use strict';

const config = require('config');

const colorIndex = config.colorIndex || [0, 1, 2];

const r = colorIndex[0];
const g = colorIndex[1];
const b = colorIndex[2];

const each = function(pixel, leds, pre, init) {
  pre.push('0x' + Number(pixel.values[r] & 0xff).toString(16), '0x' + Number(pixel.values[g] & 0xff).toString(16), '0x' + Number(pixel.values[b] & 0xff).toString(16));

  return pixel.values;
};

module.exports = each;
