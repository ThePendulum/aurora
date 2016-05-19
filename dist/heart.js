'use strict';

var render = require('./render.js');
var modifiers = require('./modifiers.js');

var heart = function heart(leds) {
    modifiers.forEach(function (modifier) {
        modifier(leds);
    });

    leds.beat += 1;

    render(leds);

    setTimeout(function () {
        heart(leds);
    }, leds.interval);
};

module.exports = heart;