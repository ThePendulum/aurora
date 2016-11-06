'use strict';

var util = require('util');

var color = require('./modifiers/color/color.js');
var draw = require('./modifiers/draw/draw.js');
var regulator = require('./modifiers/regulator/regulator.js');
var render = require('./modifiers/render/render.js');

module.exports = function (leds) {
  return [color(leds), draw(leds), regulator(leds), render(leds)];
};