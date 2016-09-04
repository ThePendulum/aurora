'use strict';

const config = require('config');

const util = require('util');

const SPI = require('spi');
const note = require('note-log');
const ws281x = require('rpi-ws281x-native');
const SerialPort = require('serialport');

const chipMap = require('./chipMap.js');

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

chips.usb = function(leds) {
  leds.usb = new SerialPort(config.usb.path, config.usb);

  leds.usb.open();

  leds.usb.on('data', data => {
    note(data.toString());
  });

  leds.usb.on('error', note);
};

module.exports = function() {
    let size = config.get('size');
    let length = Array.isArray(size) ? size[0] * size[1] : size;

    const leds = {};

    leds.chip = chipMap(config.chip);

    const init = chips[leds.chip];

    if(!init) {
        throw new Error('Chip not supported');
    }

    leds.pixels = Array.apply(null, Array(length)).map((pixel, index) => {
      let x, y;

      if(Array.isArray(size)) {
        y = Math.floor(index / size[1]);

        if(config.zigzag && y % 2 === 0) {
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
    leds.interval = 30;

    leds.mode = 'hsv';

    init(leds);

    return leds;
};
