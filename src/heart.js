'use strict';

const render = require('./render.js');
const modifiers = require('./modifiers.js');

const heart = function(leds) {
    modifiers.forEach(modifier => {
        modifier(leds);
    });

    leds.beat += 1;

    render(leds);

    setTimeout(function() {
        heart(leds);
    }, leds.interval);
};

module.exports = heart;
