'use strict';

var config = require('config');

var util = require('util');

var SPI = require('spi');
var ws281x = require('rpi-ws281x-native');

var chips = {};

chips.ws2801 = function (leds) {
    leds.spi = new SPI.Spi('/dev/spidev0.0', {
        mode: SPI.MODE['MODE_0'],
        chipSelect: SPI.CS['none']
    }, function (s) {
        s.open();
    });
};

chips.ws281x = function (leds) {
    ws281x.init(leds.pixels.length);
};

chips.ws2811 = chips.ws281x;
chips.ws2812 = chips.ws281x;
chips.ws2812b = chips.ws281x;

var init = chips[config.get('chip').toLowerCase()];

if (!init) {
    throw new Error('Chip not supported');
}

module.exports = function () {
    var size = config.get('size');
    var length = Array.isArray(size) ? size[0] * size[1] : size;

    var leds = {};

    leds.pixels = Array.apply(null, Array(length)).map(function (pixel, index) {
        var x = void 0,
            y = void 0;

        if (Array.isArray(size)) {
            y = Math.floor(index / size[1]);

            if (config.zigzag && y % 2) {
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
            index: index,
            x: x,
            y: y
        };
    });

    leds.beat = 0;
    leds.interval = 10;

    leds.mode = 'rgb';

    leds.rgb = {
        red: {
            value: 255,
            eval: function _eval() {
                return 255;
            }
        },
        green: {
            value: 0,
            eval: function _eval() {
                return 0;
            }
        },
        blue: {
            value: 0,
            eval: function _eval() {
                return 0;
            }
        }
    };

    leds.hsv = {
        hue: {
            value: 0,
            eval: function _eval() {
                return 0;
            }
        },
        saturation: {
            value: 1,
            eval: function _eval() {
                return 1;
            }
        },
        value: {
            value: 1,
            eval: function _eval() {
                return 1;
            }
        }
    };

    init(leds);

    return leds;
};