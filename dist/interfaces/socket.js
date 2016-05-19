'use strict';

var config = require('config');
var util = require('util');
var note = require('note-log');
var ws = require('ws').Server;
var math = require('mathjs');

module.exports = function (leds) {
    var wss = new ws({ port: config.get('socket.port') });

    note('socket', 'Socket server listening on port ' + config.get('socket.port'));

    wss.on('connection', function (socket) {
        var ops = {
            interval: function interval(value) {
                leds.interval = value;
            },
            pattern: {
                mode: function mode(value) {
                    leds.pattern.mode = value;

                    note(value, leds.pattern.mode);
                },
                values: function values(_values) {
                    try {
                        Object.keys(_values).forEach(function (property) {
                            leds.pattern[property] = {
                                value: _values[property],
                                eval: math.compile(_values[property]).eval
                            };
                        });
                    } catch (error) {
                        socket.send(error);
                    }
                }
            }
        };

        socket.on('message', function (msg) {
            var selector = JSON.parse(msg);

            var operation = selector.slice(0, -1).reduce(function (acc, property) {
                return acc[property];
            }, ops);

            if (operation) {
                operation(selector.slice(-1)[0]);
            };
        });
    });
};