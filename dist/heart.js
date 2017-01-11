'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');

var heart = function heart(leds, ws) {
    var modifiers = require('./modifiers/modifiers.js')(leds);

    var initResults = modifiers.map(function (modifier, index) {
        if (modifier.init) {
            return modifier.init(leds, ws);
        }
    });

    var preResults = Array.from({ length: modifiers.length });

    var beat = function beat() {
        // performance critical, abstractions too slow
        for (var modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
            if (modifiers[modifierIndex].pre) {
                preResults[modifierIndex] = modifiers[modifierIndex].pre(leds, initResults[modifierIndex]);
            }
        }

        for (var pixelIndex = 0; pixelIndex < leds.pixels.length; pixelIndex++) {
            for (var _modifierIndex = 0; _modifierIndex < modifiers.length; _modifierIndex++) {
                modifiers[_modifierIndex].each(leds.pixels[pixelIndex], leds, preResults[_modifierIndex], initResults[_modifierIndex]);
            }
        }

        for (var _modifierIndex2 = 0; _modifierIndex2 < modifiers.length; _modifierIndex2++) {
            if (modifiers[_modifierIndex2].post) {
                modifiers[_modifierIndex2].post(leds, preResults[_modifierIndex2], initResults[_modifierIndex2]);
            }
        }

        leds.beat += 1;

        setTimeout(beat, leds.interval);
    };

    beat();
};

module.exports = heart;