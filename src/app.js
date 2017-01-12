'use strict';

require('babel-polyfill');

const leds = require('./init.js')();
const socket = require('./socket.js')(leds);

require('./web.js')(leds, socket);
require('./heart.js')(leds, socket);
