'use strict';

require('babel-polyfill');

var leds = require('./init.js')();

var socket = require('./web.js')(leds);
require('./heart.js')(leds, socket);