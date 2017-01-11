'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');
var Parser = require('expr-eval').Parser;

var parser = new Parser();

var init = function init(leds, ws) {
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

    ws.on('connection', function (wss) {
        if (leds.mode === 'rgb') {
            wss.transfer('rgb', { red: rgb.red.value, green: rgb.green.value, blue: rgb.blue.value });
        } else if (leds.mode === 'hsv') {
            wss.transfer('hsv', { hue: hsv.hue.value, saturation: hsv.saturation.value, value: hsv.value.value });
        }

        wss.transfer('modulation', {
            x: scope.mx,
            y: scope.my
        });

        wss.on('message', function (msg) {
            try {
                (function () {
                    var data = JSON.parse(msg);

                    if (data[0] === 'rgb') {
                        Object.keys(rgb).forEach(function (prop) {
                            rgb[prop] = {
                                value: data[1][prop],
                                eval: parser.parse(data[1][prop].toString())
                            };
                        });

                        wss.broadcast('rgb', data[1]);
                    }

                    if (data[0] === 'hsv') {
                        Object.keys(hsv).forEach(function (prop) {
                            hsv[prop] = {
                                value: data[1][prop],
                                eval: parser.parse(data[1][prop].toString())
                            };
                        });

                        wss.broadcast('rgb', data[1]);
                    }

                    if (data[0] === 'modulation') {
                        scope.mx = data[1].x;
                        scope.my = data[1].y;

                        wss.broadcast('modulation', data[1]);
                    }
                })();
            } catch (error) {
                note('color', error);
            }
        });
    });

    return { rgb: rgb, hsv: hsv, scope: scope };
};

module.exports = init;