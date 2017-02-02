'use strict';

const note = require('note-log');
const util = require('util');

const color = require('./color');
const draw = require('./draw');
const filters = require('./filters');
const feedback = require('./feedback');
const previous = require('./previous');
const regulator = require('./regulator');
const gamma = require('./gamma');
const render = require('./render');

module.exports = function(leds) {
    return [color(leds), draw(leds), filters(leds), feedback(leds), previous(leds), regulator(leds), gamma(leds), render(leds)];
};
