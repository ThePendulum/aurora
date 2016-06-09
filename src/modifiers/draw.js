'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const init = function(leds, ws) {
  const init = {
    canvas: Array.apply(null, new Array(leds.pixels.length)).map(value => {
      return {
        values: [0, 0, 0],
        opacity: 0
      };
    })
  };

  ws.on('connection', wss => {
    wss.on('message', msg => {
      const data = JSON.parse(msg);

      if(data[0] === 'draw') {
        const index = data[1].y * config.size[1] + (data[1].y % 2 ? config.size[0] - 1 - data[1].x : data[1].x);

        init.canvas[index] = data[1];
      }

      if(data[0] === 'fill') {
        init.canvas = init.canvas.map(value => data[1]);
      }
    });
  });

  return init;
};

const each = function(pixel, leds, pre, init) {
  const pencil = init.canvas[pixel.index];

  return pencil.values.map((value, index) => {
    return (1 - pencil.opacity) * pixel.values[index] + pencil.opacity * value;
  });
};

module.exports = {init, each};
