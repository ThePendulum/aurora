'use strict';

const config = require('config');
const note = require('note-log');
const ws281x = require('rpi-ws281x-native');

const colorIndex = config.colorIndex || [0, 1, 2];

const r = colorIndex[0];
const g = colorIndex[1];
const b = colorIndex[2];

const pre = function(leds, initResults) {
  leds.buffer = [];
};

const each = function(pixel, leds, preResults, initResults) {
  const chips = {};

  chips.ws2801 = function() {
    leds.buffer.push('0x' + Number(pixel.values[r] & 0xff).toString(16), '0x' + Number(pixel.values[g] & 0xff).toString(16), '0x' + Number(pixel.values[b] & 0xff).toString(16));
  };

  chips.ws281x = function() {
    leds.buffer.push(((pixel.values[r] & 0xff) << 16) + ((pixel.values[g] & 0xff) << 8) + (pixel.values[b] & 0xff));
  };

  chips.usb = chips.ws2801;

  chips[leds.chip]();

  return pixel.values;
};

const post = function(leds, pre, init) {
  const chips = {};

  chips.ws2801 = function() {
    leds.spi.write(new Buffer(leds.buffer));
  };

  chips.ws281x = function() {
    ws281x.render(new Uint32Array(leds.buffer));
  };

  chips.usb = function() {
    if(leds.usb.isOpen()) {
      leds.usb.write(new Buffer(leds.buffer));
    }
  };

  chips[leds.chip]();
};

const init = function(leds, ws) {
  ws.on('connection', wss => {
    const update = function() {
      wss.transfer('meta', {
        size: config.size,
        pixels: leds.pixels,
        regulator: config.regulator
      });

      setTimeout(() => {
        update();
      }, config.socket.previewUpdateInterval || 1000);
    };

    update();
  });

  if(config.persist === false) {
    const shutdown = function() {
      // 'short circuit' beat to turn off LEDs
      leds.pixels = leds.pixels.map(pixel => {
        pixel.values = [0, 0, 0];

        return pixel;
      });

      pre(leds);

      leds.pixels.forEach(pixel => {
        each(pixel, leds);
      });

      post(leds);

      process.exit();
    };

    process.on('SIGINT', shutdown);
    process.on('exit', shutdown);
  }
};

module.exports = {init, pre, each, post};
