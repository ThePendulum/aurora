'use strict';

const leds = require('./leds.js')();
require('./interfaces.js')(leds);

require('./heart.js')(leds);
