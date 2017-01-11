'use strict';

const ws281x = require('rpi-ws281x-native');

const post = function(leds, pre, init) {
    ws281x.render(new Uint32Array(init));
};

module.exports = post;
