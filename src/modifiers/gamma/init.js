'use strict';

const config = require('config');

const init = function(leds, socket) {
    return Array.from({length: 256}, (value, index) => ((index / 255) ** (1 / (config.gamma || 1))) * 255);
};

module.exports = init;
