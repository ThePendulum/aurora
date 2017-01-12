'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const Parser = require('expr-eval').Parser;
const parser = new Parser();

const init = function(leds, socket) {
    const rgb = {
        red: {
            value: 255,
            eval: Parser.parse('255')
        },
        green: {
            value: 0,
            eval: Parser.parse('0')
        },
        blue: {
            value: 0,
            eval: Parser.parse('0')
        }
    };

    const hsv = {
        hue: {
            value: 0,
            eval: Parser.parse('0')
        },
        saturation: {
            value: 1,
            eval: Parser.parse('1')
        },
        value: {
            value: 1,
            eval: Parser.parse('1')
        }
    };

    const scope = {};

    scope.length = scope.l = leds.pixels.length;
    scope.width = scope.w = config.size[0] || config.size;
    scope.height = scope.h = config.size[1] || 1;
    scope.mx = 0;
    scope.my = 0;

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
            rgb[prop] = {
                value: newRgb[prop],
                eval: parser.parse(newRgb[prop].toString())
            };
        });
    });

    socket.listen('hsv', newHsv => {
        Object.keys(hsv).forEach(prop => {
            hsv[prop] = {
                value: newHsv[prop],
                eval: parser.parse(newHsv[prop].toString())
            };
        });
    });

    socket.listen('modulation', newModulation => {
        scope.mx = newModulation.x;
        scope.my = newModulation.y;
    });

    return {rgb, hsv, scope};
};

module.exports = init;
