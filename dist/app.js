'use strict';

require('babel-polyfill');

var leds = require('./init.js')();
require('./interfaces.js')(leds);

require('./heart.js')(leds);