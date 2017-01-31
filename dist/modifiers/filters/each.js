'use strict';

var each = function each(pixel, leds, pre, init) {
    pixel.values[0] = pixel.values[0] * (1 - init.filters.smoothing) + pixel.previous.values[0] * init.filters.smoothing;
    pixel.values[1] = pixel.values[1] * (1 - init.filters.smoothing) + pixel.previous.values[1] * init.filters.smoothing;
    pixel.values[2] = pixel.values[2] * (1 - init.filters.smoothing) + pixel.previous.values[2] * init.filters.smoothing;
};

module.exports = each;