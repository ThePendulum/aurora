'use strict';

const note = require('note-log');
const util = require('util');

const init = function(leds, socket) {
    socket.init('pixels', () => {
        return leds.pixels;
    });

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
