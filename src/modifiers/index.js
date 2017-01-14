'use strict';

const note = require('note-log');
const util = require('util');

const color = require('./color');
const regulator = require('./regulator');
const render = require('./render');

note('mods', 0, util.inspect(color));

module.exports = function(leds) {
    return [color(leds), feedback(leds), regulator(leds), render(leds)];
};
