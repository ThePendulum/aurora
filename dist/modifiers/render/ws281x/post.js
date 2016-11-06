'use strict';

var ws281x = require('rpi-ws281x-native');

var post = function post(leds, pre, init) {
    ws281x.render(new Uint32Array(pre));
};

module.exports = post;