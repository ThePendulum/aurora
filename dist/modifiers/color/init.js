'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');

var Parser = require('expr-eval').Parser;
var parser = new Parser();

var init = function init(leds, socket) {
    var rgb = {
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

    var hsv = {
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

    var scope = {};

    scope.length = scope.l = leds.pixels.length;
    scope.width = scope.w = config.size[0] || config.size;
    scope.height = scope.h = config.size[1] || 1;
    scope.mx = 0;
    scope.my = 0;

    socket.init('rgb', function () {
        return {
            red: rgb.red.value,
            green: rgb.green.value,
            blue: rgb.blue.value
        };
    });

    socket.init('hsv', function () {
        return {
            hue: hsv.hue.value,
            saturation: hsv.saturation.value,
            value: hsv.value.value
        };
    });

    socket.init('modulation', function () {
        return {
            x: scope.mx,
            y: scope.my
        };
    });

    socket.listen('rgb', function (newRgb) {
        Object.keys(rgb).forEach(function (prop) {
            rgb[prop] = {
                value: newRgb[prop],
                eval: parser.parse(newRgb[prop].toString())
            };
        });
    });

    socket.listen('hsv', function (newHsv) {
        Object.keys(hsv).forEach(function (prop) {
            hsv[prop] = {
                value: newHsv[prop],
                eval: parser.parse(newHsv[prop].toString())
            };
        });
    });

    socket.listen('modulation', function (newModulation) {
        scope.mx = newModulation.x;
        scope.my = newModulation.y;
    });

    return { rgb: rgb, hsv: hsv, scope: scope };
};

module.exports = init;