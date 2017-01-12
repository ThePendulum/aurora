'use strict';

var util = require('util');

var color = require('./color/color.js');
var draw = require('./draw/draw.js');
var regulator = require('./regulator/regulator.js');
var feedback = require('./feedback/feedback.js');
var render = require('./render/render.js');

module.exports = function (leds) {
    return [color(leds), feedback(leds), regulator(leds), render(leds)];
};