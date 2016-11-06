'use strict';

const note = require('note-log');
const util = require('util');

const each = function(pixel, leds, pre, init) {
  const pencil = init.canvas[pixel.index];

  return pencil.values.map((value, index) => {
    return (1 - pencil.opacity) * pixel.values[index] + pencil.opacity * value;
  });
};

module.exports = each;
