'use strict';

var config = require('config');

var colorIndex = config.colorIndex || [0, 1, 2];

var r = colorIndex[0];
var g = colorIndex[1];
var b = colorIndex[2];

var each = function each(pixel, leds, pre, init) {
    var index = pixel.index * 3;

    init.buffer[index] = '0x' + Number(pixel.values[r] & 0xff).toString(16);
    init.buffer[index + 1] = '0x' + Number(pixel.values[r] & 0xff).toString(16);
    init.buffer[index + 2] = '0x' + Number(pixel.values[r] & 0xff).toString(16);
};

module.exports = each;