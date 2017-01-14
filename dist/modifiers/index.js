'use strict';

var note = require('note-log');
var util = require('util');

var color = require('./color');
var regulator = require('./regulator');
var render = require('./render');

note('mods', 0, util.inspect(color));

module.exports = function (leds) {
    return [color(leds), feedback(leds), regulator(leds), render(leds)];
};