'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const heart = function(leds, ws) {
    const modifiers = require('./modifiers/modifiers.js')(leds);

    const initResults = modifiers.map((modifier, index) => {
        if(modifier.init) {
            return modifier.init(leds, ws);
        }
    });

    const beat = function() {
        const preResults = modifiers.map((modifier, index) => {
            if(modifier.pre) {
                return modifier.pre(leds, initResults[index]);
            }
        });

        for(let pixelIndex = 0; pixelIndex < leds.pixels.length; pixelIndex++) {
            for(let modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
                modifiers[modifierIndex].each(leds.pixels[pixelIndex], leds, preResults[modifierIndex], initResults[modifierIndex]);
            }
        }

        const postResults = modifiers.map((modifier, index) => {
            if(modifier.post) {
                return modifier.post(leds, preResults[index], initResults[index]);
            }
        });

        leds.beat += 1;

        setTimeout(beat, leds.interval);
    };

    beat();
};

module.exports = heart;
