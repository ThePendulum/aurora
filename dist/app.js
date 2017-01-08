'use strict';

require('babel-polyfill');

var leds = require('./init.js')();

var ws = require('./socket.js')(leds);
require('./web.js')(leds);

require('./heart.js')(leds, ws);