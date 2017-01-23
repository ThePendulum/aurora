'use strict';

const note = require('note-log');
const util = require('util');

const each = function(pixel, leds, pre, init) {
    const pencil = init.canvas[pixel.x][pixel.y];

    if(pencil) {
        pixel.values[0] = pencil[0];
        pixel.values[1] = pencil[1];
        pixel.values[2] = pencil[2];
    }
};

module.exports = each;
