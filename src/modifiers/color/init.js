'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');
const pick = require('object.pick');

const Parser = require('expr-eval').Parser;
const parser = new Parser();

const expand =  require('../../utils/expand.js');

const init = function(leds, socket) {
    const options = {
        mode: 'rgb'
    };

    const rgb = {
        red: { value: 255 },
        green: { value: 0 },
        blue: { value: 0 }
    };

    const hsv = {
        hue: { value: 0 },
        saturation: { value: 1 },
        value: { value: 1 }
    };

    if(config.init) {
        if(config.init.red || config.init.green || config.init.blue) { options.mode = 'rgb'; }

        if(config.init.red) { rgb.red.value = config.init.red; }
        if(config.init.green) { rgb.green.value = config.init.green; }
        if(config.init.blue) { rgb.blue.value = config.init.blue; }

        if(config.init.hue || config.init.saturation || config.init.value) { options.mode = 'hsv'; }

        if(config.init.hue) { hsv.hue.value = config.init.hue; }
        if(config.init.saturation) { hsv.saturation.value = config.init.saturation; }
        if(config.init.value) { hsv.value.value = config.init.value; }
    }

    rgb.red.eval = Parser.parse(rgb.red.value.toString());
    rgb.green.eval = Parser.parse(rgb.green.value.toString());
    rgb.blue.eval = Parser.parse(rgb.blue.value.toString());

    hsv.hue.eval = Parser.parse(hsv.hue.value.toString());
    hsv.saturation.eval = Parser.parse(hsv.saturation.value.toString());
    hsv.value.eval = Parser.parse(hsv.value.value.toString());

    const scope = {};

    scope.length = scope.l = leds.pixels.length;
    scope.width = scope.w = config.size[0] || config.size;
    scope.height = scope.h = config.size[1] || 1;
    scope.mx = 0;
    scope.my = 0;

    socket.init('mode', () => {
        return options.mode;
    });

    socket.init('rgb', () => {
        return {
            red: rgb.red.value,
            green: rgb.green.value,
            blue: rgb.blue.value
        };
    });

    socket.init('hsv', () => {
        return {
            hue: hsv.hue.value,
            saturation: hsv.saturation.value,
            value: hsv.value.value
        };
    });

    socket.init('modulation', () => {
        return {
            x: scope.mx,
            y: scope.my
        };
    });

    socket.listen('rgb', newRgb => {
        Object.keys(rgb).forEach(prop => {
            const newProp = newRgb[prop] === null ? '0' : expand(newRgb[prop].toString());

            try {
                rgb[prop] = {
                    value: newProp,
                    eval: parser.parse(newProp)
                };
            } catch(error) {
                note('color', 2, 'Invalid value for \'' + prop + '\': ' + error.message);
            }
        });
    });

    socket.listen('hsv', newHsv => {
        Object.keys(hsv).forEach(prop => {
            const newProp = newHsv[prop] === null ? '0' : expand(newHsv[prop].toString());

            try {
                hsv[prop] = {
                    value: newProp,
                    eval: parser.parse(newProp)
                };
            } catch(error) {
                note('color', 2, 'Invalid value for \'' + prop + '\': ' + error.message);
            }
        });
    });

    socket.listen('mode', mode => {
        options.mode = mode;
    });

    socket.listen('modulation', newModulation => {
        scope.mx = newModulation.x;
        scope.my = newModulation.y;
    });

    return {rgb, hsv, scope, options};
};

module.exports = init;
