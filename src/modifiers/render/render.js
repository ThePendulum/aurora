'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const methods = {
  ws281x: require('./ws281x/ws281x.js'),
  ws2801: require('./ws2801/ws2801.js')
};

module.exports = function(leds) {
    if(methods[leds.chip]) {
      return methods[leds.chip];
    }

    throw new Error('Chip has no render method');
};
