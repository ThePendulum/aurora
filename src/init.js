'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const chipMap = require('./chipMap.js');

module.exports = function() {
    const size = config.size;
    const zigzag = config.has('zigzag') ? config.zigzag : true;

    let flipIndex, flipX, flipY = false;

    if(config.has('mirror')) {
        flipIndex = config.mirror.includes('index');
        flipX = config.mirror.includes('x');
        flipY = config.mirror.includes('y');
    }

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
        pixel = {
            values: [0, 0, 0],
            index,
            realIndex: index,
            x: index,
            y: 0,
            previous: {}
        };

        if(Array.isArray(size)) {
            pixel.y = Math.floor(index / leds.height);

            if(zigzag && y % 2) {
                pixel.x = index % leds.width;
            } else {
                pixel.x = leds.width - 1 - index % leds.width;
            }
        } else {
            pixel.y = 0;
            pixel.x = index;
        }

        if(flipIndex) {
            pixel.index = length - 1 - pixel.index;
        }

        if(flipX) {
            pixel.x = leds.width - 1 - pixel.x;
        }

        if(flipY) {
            pixel.y = leds.height - 1 - pixel.y;
        }

        return pixel;
    });

    leds.beat = 0;
    leds.interval = config.fps ? Math.round(1000 / config.fps) : (config.interval || 30);

    return leds;
};
