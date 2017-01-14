'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');
const SPI = require('spi');

const chipMap = require('./chipMap.js');

module.exports = function() {
    const size = config.size;
    const zigzag = config.zigzag === undefined ? true : config.zigzag;

    const leds = {};
    let length;

    leds.chip = chipMap(config.chip);
    leds.on = true;

    if(Array.isArray(size)) {
        leds.width = size[0];
        leds.height = size[1];

        length = size[0] * size[1];
    } else {
        leds.width = size;
        leds.height = 1;

        length = size;
    }

    leds.pixels = Array.from({length}, (pixel, index) => {
        let x, y;

        if(Array.isArray(size)) {
            y = Math.floor(index / leds.height);

            if(zigzag && y % 2 === 0) {
                x = index % leds.width;
            } else {
                x = leds.width - 1 - index % leds.width;
            }
        } else {
            y = 0;
            x = index;
        }

        return {
            values: [0, 0, 0],
            index,
            x,
            y,
            previous: {}
        };
    });

    leds.beat = 0;
    leds.interval = config.fps ? Math.round(1000 / config.fps) : (config.interval || 30);
    leds.mode = 'hsv';

    return leds;
};
