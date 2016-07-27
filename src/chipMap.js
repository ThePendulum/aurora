'use strict';

module.exports = function(chip) {
  const chips = {};

  chips.ws281x = 'ws281x';
  chips.ws2811 = chips.ws281x;
  chips.ws2812 = chips.ws281x;
  chips.ws2812b = chips.ws281x;

  chips.ws2801 = 'ws2801';

  chips.usb = 'usb';

  return chips[chip.toLowerCase()];
};
