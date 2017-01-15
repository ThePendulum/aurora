'use strict';

require('babel-polyfill');

const leds = require('./init.js')();

const socket = require('./web.js')(leds);
require('./heart.js')(leds, socket);
