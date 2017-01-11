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

    var beat = function beat() {
        var preResults = modifiers.map(function (modifier, index) {
            if (modifier.pre) {
                return modifier.pre(leds, initResults[index]);
            }
        });

        for (var pixelIndex = 0; pixelIndex < leds.pixels.length; pixelIndex++) {
            for (var modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
                modifiers[modifierIndex].each(leds.pixels[pixelIndex], leds, preResults[modifierIndex], initResults[modifierIndex]);
            }
        }

        var postResults = modifiers.map(function (modifier, index) {
            if (modifier.post) {
                return modifier.post(leds, preResults[index], initResults[index]);
            }
        });

        leds.beat += 1;

        setTimeout(beat, leds.interval);
    };

    beat();
};

module.exports = heart;