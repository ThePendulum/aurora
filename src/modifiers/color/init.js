'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');
const math = require('mathjs');

const init = function(leds, ws) {
    const rgb = {
        red: {
            value: 255,
            eval: () => 255
        },
        green: {
            value: 0,
            eval: () => 0
        },
        blue: {
            value: 0,
            eval: () => 0
        }
    };

    const hsv = {
        hue: {
            value: 0,
            eval: () => 0
        },
        saturation: {
            value: 1,
            eval: () => 1
        },
        value: {
            value: 1,
            eval: () => 1
        }
    };

    ws.on('connection', wss => {
        if(leds.mode === 'rgb') {
            wss.transfer('rgb', {red: rgb.red.value, green: rgb.green.value, blue: rgb.blue.value});
        } else if(leds.mode === 'hsv') {
            wss.transfer('hsv', {hue: hsv.hue.value, saturation: hsv.saturation.value, value: hsv.value.value});
        }

        wss.on('message', msg => {
            try {
                const data = JSON.parse(msg);

                if(data[0] === 'rgb') {
                    try {
                        Object.keys(data[1]).forEach(prop => {
                            rgb[prop] = {
                                value: data[1][prop],
                                eval: math.compile(data[1][prop]).eval
                            };
                        });

                        wss.broadcast('rgb', data[1]);
                    } catch(error) {
                        wss.transfer('error', error.message);
                    }
                }

                if(data[0] === 'hsv') {
                    try {
                        Object.keys(data[1]).forEach(prop => {
                            hsv[prop] = {
                                value: data[1][prop],
                                eval: math.compile(data[1][prop]).eval
                            };
                        });

                        wss.broadcast('hsv', data[1]);
                    } catch(error) {
                        wss.transfer('error', error.message);
                    }
                }
            } catch(error) {
                note('color', error);
            }
        });
    });

    const scope = {};

    scope.length = scope.l = leds.pixels.length;
    scope.width = scope.w = config.size[0] || config.size;
    scope.height = scope.h = config.size[1] || 1;

    return {rgb, hsv, scope};
};

module.exports = init;
