'use strict';

const note = require('note-log');
const util = require('util');

const color = require('./color');
const draw = require('./draw');
const feedback = require('./feedback');
const regulator = require('./regulator');
const render = require('./render');

module.exports = function(leds) {
    return [color(leds), draw(leds), feedback(leds), regulator(leds), render(leds)];
};
