'use strict';

const config = require('config');
const util = require('util');
const note = require('note-log');

const ws281x = require('rpi-ws281x-native');
const ws2801 = require('rpi-ws2801');

const chips = {};

const colorIndex = config.has('colorIndex') ? config.get('colorIndex') : [0, 1, 2];

const r = colorIndex[0];
const g = colorIndex[1];
const b = colorIndex[2];

chips.ws2801 = function(leds) {
    const data = leds.pixels.reduce((acc, color) => {
        return acc.concat('0x' + Number(color[r]).toString(16), '0x' + Number(color[g]).toString(16), '0x' + Number(color[b]).toString(16));
    }, []);

    leds.spi.write(new Buffer(data));
};

chips.ws281x = function(leds) {
    const data = new Uint32Array(leds.pixels.length).map((value, index) => {
        const rgb = leds.pixels[index];

        return ((rgb[r] & 0xff) << 16) + ((rgb[g] & 0xff) << 8) + (rgb[b] & 0xff);
    });

    ws281x.render(data);
};

chips.ws2811 = chips.ws281x;
chips.ws2812 = chips.ws281x;
chips.ws2812b = chips.ws281x;

const render = chips[config.get('chip').toLowerCase()];

if(!render) {
    throw new Error('Chip not supported');
}

module.exports = function(leds) {
    render(leds);
};
