'use strict';

var config = require('config');

var note = require('note-log');
var util = require('util');

var deregulator = 1 / config.regulator;

var each = function each(pixel, leds, pre, init) {
    init[pixel.realIndex].values[0] = pixel.values[0];
    init[pixel.realIndex].values[1] = pixel.values[1];
    init[pixel.realIndex].values[2] = pixel.values[2];
};

module.exports = each;