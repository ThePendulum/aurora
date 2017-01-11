'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const each = function(pixel, leds) {
    if(leds.on) {
        pixel.values[0] = pixel.values[0] * config.regulator;
        pixel.values[1] = pixel.values[1] * config.regulator;
        pixel.values[2] = pixel.values[2] * config.regulator;
    } else {
        pixel.values[0] = 0;
        pixel.values[1] = 0;
        pixel.values[2] = 0;
    }
};

module.exports = each;
