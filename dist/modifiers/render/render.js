'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');

var methods = {
  ws281x: require('./ws281x/ws281x.js'),
  ws2801: require('./ws2801/ws2801.js')
};

module.exports = function (leds) {
  if (methods[leds.chip]) {
    return methods[leds.chip];
  }

  throw new Error('Chip has no render method');
};