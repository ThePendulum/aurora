'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');

var methods = {
  ws281x: require('./ws281x'),
  ws2801: require('./ws2801')
};

module.exports = function (leds) {
  if (methods[leds.chip]) {
    return methods[leds.chip];
  }

  throw new Error('Chip has no render method');
};