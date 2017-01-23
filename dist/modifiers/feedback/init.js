'use strict';

var note = require('note-log');
var util = require('util');

var init = function init(leds, socket) {
    return leds.pixels.map(function (pixel) {
        return {
            x: pixel.x,
            y: pixel.y,
            index: pixel.index,
            values: pixel.values
        };
    });
};

module.exports = init;