'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');

var each = function each(pixel, leds) {
  return pixel.values.map(function (value) {
    return value * (leds.on ? config.regulator || 1 : 0);
  });
};

module.exports = each;