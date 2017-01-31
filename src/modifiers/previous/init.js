'use strict';

const init = function(leds, socket) {
    leds.pixels.forEach(pixel => {
        pixel.previous.values = pixel.values;
    });
};

module.exports = init;
