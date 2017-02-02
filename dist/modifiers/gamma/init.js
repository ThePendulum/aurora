'use strict';

var config = require('config');

var init = function init(leds, socket) {
    return Array.from({ length: 256 }, function (value, index) {
        return Math.pow(index / 255, 1 / (config.gamma || 1)) * 255;
    });
};

module.exports = init;