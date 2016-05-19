'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');
const math = require('mathjs');
const hsv2rgb = require('../utils/hsv2rgb.js');

module.exports = function(leds) {
    const scope = {
        beat: leds.beat,
        length: leds.pixels.length,
        random: Math.random(),
        width: config.size[0] || config.size,
        height: config.size[1] || 1
    };

    scope.b = scope.beat;
    scope.l = scope.length;
    scope.r = scope.random;
    scope.w = scope.width;
    scope.h = scope.height;

    leds.pixels = leds.pixels.map((color, index) => {
        scope.index = index;
        scope.i = scope.index;

        scope.pixelRandom = Math.random();
        scope.pr = scope.pixelRandom;

        if(Array.isArray(config.size)) {
            scope.y = Math.floor(index / config.size[1]);

            if(config.zigzag && scope.y % 2) {
                scope.x = index % scope.width;
            } else {
                scope.x = config.size[0] - 1 - index % config.size[0];
            }
        } else {
            scope.y = 0;
            scope.x = index;
        }

        if(leds.pattern.mode === 'hsv') {
            let hue, saturation, value;

            try {
                hue = leds.pattern.hue.eval(scope);
                saturation = leds.pattern.saturation.eval(scope);
                value = leds.pattern.value.eval(scope);
            } catch(error) {
                note(error);
            }

            return hsv2rgb(hue, saturation, value);
        }

        if(leds.pattern.mode === 'rgb') {
            let r, g, b;

            try {
                r = leds.pattern.red.eval(scope);
                g = leds.pattern.green.eval(scope);
                b = leds.pattern.blue.eval(scope);
            } catch(error) {
                note(error);
            }

            return [r, g, b];
        }
    });
};
