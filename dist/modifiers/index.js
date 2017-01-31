'use strict';

var note = require('note-log');
var util = require('util');

var color = require('./color');
var draw = require('./draw');
var filters = require('./filters');
var feedback = require('./feedback');
var previous = require('./previous');
var regulator = require('./regulator');
var render = require('./render');

module.exports = function (leds) {
    return [color(leds), draw(leds), filters(leds), feedback(leds), previous(leds), regulator(leds), render(leds)];
};