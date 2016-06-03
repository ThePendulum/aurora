'use strict';

var color = require('./modifiers/color.js');
var regulator = require('./modifiers/regulator.js');
var draw = require('./modifiers/draw.js');
var render = require('./modifiers/render.js');

module.exports = [color, draw, regulator, render];