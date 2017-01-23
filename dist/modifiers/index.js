'use strict';

var note = require('note-log');
var util = require('util');

var color = require('./color');
var draw = require('./draw');
var feedback = require('./feedback');
var regulator = require('./regulator');
var render = require('./render');

module.exports = function (leds) {
    return [color(leds), draw(leds), feedback(leds), regulator(leds), render(leds)];
};