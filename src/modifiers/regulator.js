'use strict';

const config = require('config');
const note = require('note-log');

const each = function(pixel, leds) {
  return pixel.values.map(value => value * (config.regulator || 1));
};

module.exports = {each};
