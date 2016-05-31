'use strict';

require('babel-polyfill');

const leds = require('./init.js')();
require('./interfaces.js')(leds);

require('./heart.js')(leds);
