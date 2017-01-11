'use strict';

const note = require('note-log');
const util = require('util');
const vm = require('vm');

const hsv2rgb = require('../../utils/hsv2rgb.js');

const each = function(pixel, leds, pre, init) {
    const scope = pre;

    scope.index = scope.i = pixel.index;
    scope.x = pixel.x;
    scope.y = pixel.y;
    scope.pixelRandom = scope.pr = Math.random();
    scope.previous = scope.p = pixel.values;

    if(leds.mode === 'hsv') {
        let hue, saturation, value;

        try {
            hue = init.hsv.hue.eval.evaluate(scope);
            saturation = init.hsv.saturation.eval.evaluate(scope);
            value = init.hsv.value.eval.evaluate(scope);
        } catch(error) {
            note('color', 2, error.message);
        }

        pixel.values = hsv2rgb(hue, saturation, value);
    }

    if(leds.mode === 'rgb') {
        let red, green, blue;

        try {
            red = init.rgb.red.eval.evaluate(scope);
            green = init.rgb.green.eval.evaluate(scope);
            blue = init.rgb.blue.eval.evaluate(scope);
        } catch(error) {
            note(error);
        }

        pixel.values[0] = red;
        pixel.values[1] = green;
        pixel.values[2] = blue;
    }
};

module.exports = each;
