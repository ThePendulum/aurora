'use strict';

var note = require('note-log');
var util = require('util');

var each = function each(pixel, leds, pre, init) {
    var pencil = init.canvas[pixel.x][pixel.y];

    if (pencil) {
        pixel.values[0] = pencil[0];
        pixel.values[1] = pencil[1];
        pixel.values[2] = pencil[2];
    }
};

module.exports = each;