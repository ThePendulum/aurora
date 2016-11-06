'use strict';

var note = require('note-log');
var util = require('util');

var each = function each(pixel, leds, pre, init) {
  var pencil = init.canvas[pixel.index];

  return pencil.values.map(function (value, index) {
    return (1 - pencil.opacity) * pixel.values[index] + pencil.opacity * value;
  });
};

module.exports = each;