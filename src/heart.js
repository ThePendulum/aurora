'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const heart = function(leds, socket) {
    const modifiers = require('./modifiers')(leds);

    const initResults = modifiers.map((modifier, index) => {
        if(modifier.init) {
            return modifier.init(leds, socket);
        }
    });

    let preResults = Array.from({length: modifiers.length});

    const beat = function() {
        // performance critical, abstractions too slow
        for(let modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
            if(modifiers[modifierIndex].pre) {
                preResults[modifierIndex] = modifiers[modifierIndex].pre(leds, initResults[modifierIndex], socket);
            }
        }

        for(let pixelIndex = 0; pixelIndex < leds.pixels.length; pixelIndex++) {
            for(let modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
                if(modifiers[modifierIndex].each) {
                    modifiers[modifierIndex].each(leds.pixels[pixelIndex], leds, preResults[modifierIndex], initResults[modifierIndex]);
                }
            }
        }

        for(let modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
            if(modifiers[modifierIndex].post) {
                modifiers[modifierIndex].post(leds, preResults[modifierIndex], initResults[modifierIndex], socket);
            }
        }

        leds.beat += 1;

        setTimeout(beat, leds.interval);
    };

    beat();
};

module.exports = heart;
