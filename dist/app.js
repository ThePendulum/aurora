'use strict';

require('babel-polyfill');

var leds = require('./init.js')();

var ws = require('./interfaces/socket.js')(leds);
require('./interfaces/web.js')(leds);

require('./heart.js')(leds, ws);