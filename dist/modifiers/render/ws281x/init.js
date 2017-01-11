'use strict';

var ws281x = require('rpi-ws281x-native');

var init = function init(leds) {
    ws281x.init(leds.pixels.length);

    return Array.from({ length: leds.pixels.length });
};

module.exports = init;