'use strict';

const config = require('config');
const ws281x = require('rpi-ws281x-native');

const init = function(leds) {
    ws281x.init(leds.pixels.length);

    return Array.from({length: leds.pixels.length});
};

module.exports = init;
