'use strict';

var config = require('config');

var each = function each(pixel, leds, pre, init) {
    pixel.values[0] = init[Math.round(pixel.values[0])];
    pixel.values[1] = init[Math.round(pixel.values[1])];
    pixel.values[2] = init[Math.round(pixel.values[2])];
};

module.exports = each;