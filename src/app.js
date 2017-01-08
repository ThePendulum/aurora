'use strict';

require('babel-polyfill');

const leds = require('./init.js')();

const ws = require('./socket.js')(leds);
require('./web.js')(leds);

require('./heart.js')(leds, ws);
