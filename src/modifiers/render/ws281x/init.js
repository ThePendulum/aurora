'use strict';

const ws281x = require('rpi-ws281x-native');

const init = function(leds) {
    ws281x.init(leds.pixels.length);
};

module.exports = init;
