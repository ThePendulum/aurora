'use strict';

var init = function init(leds, socket) {
    leds.pixels.forEach(function (pixel) {
        pixel.previous.values = pixel.values;
    });
};

module.exports = init;