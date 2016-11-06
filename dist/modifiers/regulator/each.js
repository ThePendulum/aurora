'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');

var each = function each(pixel, leds) {
  return pixel.values.map(function (value) {
    return value * (config.regulator || 1);
  });
};

module.exports = each;