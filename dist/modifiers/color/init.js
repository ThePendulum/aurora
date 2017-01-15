'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');
var pick = require('object.pick');

var Parser = require('expr-eval').Parser;
var parser = new Parser();

var init = function init(leds, socket) {
    var options = {
        mode: 'rgb'
    };

    var rgb = {
        red: { value: 255 },
        green: { value: 0 },
        blue: { value: 0 }
    };

    var hsv = {
        hue: { value: 0 },
        saturation: { value: 1 },
        value: { value: 1 }
    };

    if (config.init) {
        if (config.init.red || config.init.green || config.init.blue) {
            options.mode = 'rgb';
        }

        if (config.init.red) {
            rgb.red.value = config.init.red;
        }
        if (config.init.green) {
            rgb.green.value = config.init.green;
        }
        if (config.init.blue) {
            rgb.blue.value = config.init.blue;
        }

        if (config.init.hue || config.init.saturation || config.init.value) {
            options.mode = 'hsv';
        }

        if (config.init.hue) {
            hsv.hue.value = config.init.hue;
        }
        if (config.init.saturation) {
            hsv.saturation.value = config.init.saturation;
        }
        if (config.init.value) {
            hsv.value.value = config.init.value;
        }
    }

    rgb.red.eval = Parser.parse(rgb.red.value.toString());
    rgb.green.eval = Parser.parse(rgb.green.value.toString());
    rgb.blue.eval = Parser.parse(rgb.blue.value.toString());

    hsv.hue.eval = Parser.parse(hsv.hue.value.toString());
    hsv.saturation.eval = Parser.parse(hsv.saturation.value.toString());
    hsv.value.eval = Parser.parse(hsv.value.value.toString());

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

    socket.init('mode', function () {
        return options.mode;
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

    socket.listen('mode', function (mode) {
        options.mode = mode;
    });

    socket.listen('modulation', function (newModulation) {
        scope.mx = newModulation.x;
        scope.my = newModulation.y;
    });

    return { rgb: rgb, hsv: hsv, scope: scope, options: options };
};

module.exports = init;