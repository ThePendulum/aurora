'use strict';

const color = require('./modifiers/color.js');
const regulator = require('./modifiers/regulator.js');
const draw = require('./modifiers/draw.js');
const render = require('./modifiers/render.js');

module.exports = [color, draw, regulator, render];
