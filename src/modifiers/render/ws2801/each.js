'use strict';

const config = require('config');

const colorIndex = config.colorIndex || [0, 1, 2];

const r = colorIndex[0];
const g = colorIndex[1];
const b = colorIndex[2];

const each = function(pixel, leds, pre, init) {
    const index = pixel.index * 3;

    init.buffer[index] = '0x' + Number(pixel.values[r] & 0xff).toString(16);
    init.buffer[index + 1] = '0x' + Number(pixel.values[r] & 0xff).toString(16);
    init.buffer[index + 2] = '0x' + Number(pixel.values[r] & 0xff).toString(16);
};

module.exports = each;
