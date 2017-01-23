'use strict';

const note = require('note-log');
const util = require('util');

const init = function(leds, socket) {
    return leds.pixels.map(pixel => {
        return {
            x: pixel.x,
            y: pixel.y,
            index: pixel.index,
            values: pixel.values
        };
    });
};

module.exports = init;
