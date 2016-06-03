'use strict';

const config = require('config');
const note = require('note-log');

const init = function(leds, ws) {
  const canvas = Array.apply(null, new Array(leds.pixels.length)).map(value => null);

  ws.on('connection', wss => {
    wss.on('message', msg => {
      const data = JSON.parse(msg);

      if(data[0] === 'draw') {
        const x = data[1][0];
        const y = data[1][1];
        const value = data[1][2];

        const index = y * config.size[1] + (y % 2 ? config.size[0] - 1 - x : x);

        canvas[index] = value;
      }
    });
  });

  return canvas;
};

const each = function(pixel, leds, pre, init) {
  const canvas = init;

  if(canvas[pixel.index] === null) {
    return pixel.values;
  }

  return canvas[pixel.index];
};

module.exports = {init, each};
