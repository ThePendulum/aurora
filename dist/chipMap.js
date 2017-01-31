'use strict';

module.exports = function (chip) {
    var chips = {};

    chips.ws281x = 'ws281x';
    chips.ws2811 = chips.ws281x;
    chips.ws2812 = chips.ws281x;
    chips.ws2812b = chips.ws281x;

    return chips[chip.toLowerCase()] || chip.toLowerCase();
};