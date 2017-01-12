'use strict';

require('babel-polyfill');

var leds = require('./init.js')();
var socket = require('./socket.js')(leds);

require('./web.js')(leds, socket);
require('./heart.js')(leds, socket);