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

    if (Array.isArray(size)) {
        size = size[0] * size[1];
    }

    var leds = {};

    leds.pixels = Array.apply(null, Array(size)).map(function (pixel, index) {
        return [0, 0, 0];
    });

    leds.beat = 0;
    leds.interval = 50;

    leds.pattern = {
        mode: 'rgb',
        red: {
            value: 50,
            eval: function _eval() {
                return 50;
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
        },
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
            value: 0.5,
            eval: function _eval() {
                return 0.5;
            }
        }
    };

    init(leds);

    return leds;
};