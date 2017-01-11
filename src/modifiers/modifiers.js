'use strict';

const util = require('util');

const color = require('./color/color.js');
const draw = require('./draw/draw.js');
const regulator = require('./regulator/regulator.js');
const render = require('./render/render.js');

module.exports = function(leds) {
    return [color(leds), regulator(leds), render(leds)];
};
