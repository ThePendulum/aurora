'use strict';

const note = require('note-log');
const util = require('util');

const color = require('./color');
const regulator = require('./regulator');
const feedback = require('./feedback');
const render = require('./render');

module.exports = function(leds) {
    return [color(leds), feedback(leds), regulator(leds), render(leds)];
};
