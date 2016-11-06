'use strict';

const config = require('config');

const colorIndex = config.colorIndex || [0, 1, 2];

const r = colorIndex[0];
const g = colorIndex[1];
const b = colorIndex[2];

const each = function(pixel, leds, pre, init) {
  pre.push(((pixel.values[r] & 0xff) << 16) + ((pixel.values[g] & 0xff) << 8) + (pixel.values[b] & 0xff));

  return pixel.values;
};

module.exports = each;
