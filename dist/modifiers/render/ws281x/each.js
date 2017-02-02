'use strict';

var config = require('config');

var colorIndex = config.colorIndex || [0, 1, 2];

var r = colorIndex[0];
var g = colorIndex[1];
var b = colorIndex[2];

var each = function each(pixel, leds, pre, init) {
    init[pixel.realIndex] = ((pixel.values[r] & 0xff) << 16) + ((pixel.values[g] & 0xff) << 8) + (pixel.values[b] & 0xff);

    return pixel.values;
};

module.exports = each;