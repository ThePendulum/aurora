'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const each = function(pixel, leds) {
  return pixel.values.map(value => value * (leds.on ? config.regulator || 1 : 0));
};

module.exports = each;
