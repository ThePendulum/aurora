'use strict';

var note = require('note-log');
var util = require('util');

var color = require('./color');
var regulator = require('./regulator');
var feedback = require('./feedback');
var render = require('./render');

module.exports = function (leds) {
    return [color(leds), feedback(leds), regulator(leds), render(leds)];
};