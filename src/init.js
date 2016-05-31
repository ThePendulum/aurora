'use strict';

const config = require('config');

const util = require('util');

const SPI = require('spi');
const ws281x = require('rpi-ws281x-native');

const chips = {};

chips.ws2801 = function(leds) {
    leds.spi = new SPI.Spi('/dev/spidev0.0', {
        mode: SPI.MODE['MODE_0'],
        chipSelect: SPI.CS['none']
    }, function(s) {
        s.open();
    });
};

chips.ws281x = function(leds) {
    ws281x.init(leds.pixels.length);
};

chips.ws2811 = chips.ws281x;
chips.ws2812 = chips.ws281x;
chips.ws2812b = chips.ws281x;

const init = chips[config.get('chip').toLowerCase()];

if(!init) {
    throw new Error('Chip not supported');
}

module.exports = function() {
    let size = config.get('size');
    let length = Array.isArray(size) ? size[0] * size[1] : size;

    const leds = {};

    leds.pixels = Array.apply(null, Array(length)).map((pixel, index) => {
      let x, y;

      if(Array.isArray(size)) {
        y = Math.floor(index / size[1]);

        if(config.zigzag && y % 2) {
          x = index % size[0];
        } else {
          x = size[0] - 1 - index % size[0];
        }
      } else {
        y = 0;
        x = index;
      }

      return {
        values: [0, 0, 0],
        index,
        x,
        y
      };
    });

    leds.beat = 0;
    leds.interval = 10;

    leds.mode = 'rgb';

    leds.rgb = {
        red: {
            value: 255,
            eval: () => 255
        },
        green: {
            value: 0,
            eval: () => 0
        },
        blue: {
            value: 0,
            eval: () => 0
        }
    };

    leds.hsv = {
        hue: {
            value: 0,
            eval: () => 0
        },
        saturation: {
            value: 1,
            eval: () => 1
        },
        value: {
            value: 1,
            eval: () => 1
        }
    };

    init(leds);

    return leds;
};
