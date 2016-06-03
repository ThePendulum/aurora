'use strict';

require('babel-polyfill');

const leds = require('./init.js')();

const ws = require('./interfaces/socket.js')(leds);
require('./interfaces/web.js')(leds);

require('./heart.js')(leds, ws);
