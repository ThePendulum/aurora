'use strict';

const config = require('config');

const note = require('note-log');
const util = require('util');

const deregulator = 1 / config.regulator;

const each = function(pixel, leds, pre, init) {
    init[pixel.realIndex].values[0] = pixel.values[0];
    init[pixel.realIndex].values[1] = pixel.values[1];
    init[pixel.realIndex].values[2] = pixel.values[2];
};

module.exports = each;
