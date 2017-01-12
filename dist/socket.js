'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var config = require('config');
var util = require('util');
var note = require('note-log');
var WebSocket = require('ws').Server;
var uuid = require('uuid');
var math = require('mathjs');

var leds = require('./init.js');
var knex = require('./knex.js');

var getPresets = require('./presets/get.js');

var port = config.has('socket.port') ? config.socket.port : 3001;

module.exports = function (leds) {
    var ws = new WebSocket({ port: port });
    var socket = {};

    note('wss', 'Socket server listening on port ' + port);

    var init = {
        meta: function meta() {
            return {
                width: leds.width,
                height: leds.height,
                regulator: config.regulator,
                interval: leds.interval
            };
        },
        interval: function interval() {
            return leds.interval;
        },
        mode: function mode() {
            return leds.mode;
        },
        toggle: function toggle() {
            return leds.on;
        },
        presets: function presets() {
            return getPresets();
        }
    };

    var listeners = {
        mode: [function (mode) {
            leds.mode = mode;
        }],
        toggle: [function (on) {
            return leds.on = on;
        }],
        interval: [function (interval) {
            return leds.interval = interval;
        }]
    };

    socket.broadcast = function (namespace, data, exclude) {
        ws.clients.forEach(function (client) {
            if (client.readyState === 1 && client.id !== exclude) {
                client.send(JSON.stringify([namespace, data]));
            }
        });
    };

    socket.init = function (namespace, handler) {
        if (init[namespace]) {
            note('socket', 1, 'Init handler for \'' + namespace + '\' is set twice and will be overwritten.');
        }

        init[namespace] = handler;
    };

    socket.listen = function (namespace, handler, proxy) {
        var proxyHandler = function proxyHandler(data) {
            handler(data);

            if (proxy !== false) {
                socket.broadcast(namespace, data);
            }
        };

        if (listeners[namespace]) {
            listeners[namespace].push(proxyHandler);
        }

        listeners[namespace] = [proxyHandler];
    };

    ws.on('connection', function (wss) {
        note('socket', 0, 'Established websocket with \'' + (wss.upgradeReq.headers['x-forwarded-for'] || ws.upgradeReq.connection.remoteAddress) + '\'');

        wss.id = uuid();

        wss.transmit = function (namespace, data) {
            if (wss.readyState === 1) {
                wss.send(JSON.stringify([namespace, data]));
            }
        };

        Object.keys(init).forEach(function (handler) {
            Promise.resolve().then(function () {
                // init function may return value or promise
                return init[handler]();
            }).then(function (result) {
                wss.transmit(handler, result);
            });
        });

        wss.on('message', function (msg) {
            try {
                (function () {
                    var _JSON$parse = JSON.parse(msg);

                    var _JSON$parse2 = _slicedToArray(_JSON$parse, 2);

                    var namespace = _JSON$parse2[0];
                    var data = _JSON$parse2[1];


                    if (listeners[namespace]) {
                        listeners[namespace].forEach(function (listener) {
                            return listener(data);
                        });
                    }
                })();
            } catch (error) {
                note('socket', error);
            }
        });

        var ping = function ping() {
            wss.transmit('ping');

            setTimeout(ping, 1000);
        };

        ping();

        wss.on('close', function () {
            note('socket', 0, 'Closed websocket with \'' + (wss.upgradeReq.headers['x-forwarded-for'] || ws.upgradeReq.connection.remoteAddress) + '\'');
        });
    });

    return socket;
};