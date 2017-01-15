'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _noteLog = require('note-log');

var _noteLog2 = _interopRequireDefault(_noteLog);

var _ws = require('ws');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _init = require('./init.js');

var _init2 = _interopRequireDefault(_init);

var _knex = require('./knex.js');

var _knex2 = _interopRequireDefault(_knex);

var _get = require('./presets/get.js');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (wss, leds) {
    var socket = {};

    var init = {
        meta: function meta() {
            return {
                width: leds.width,
                height: leds.height,
                regulator: _config2.default.regulator,
                interval: leds.interval
            };
        },
        interval: function interval() {
            return leds.interval;
        },
        toggle: function toggle() {
            return leds.on;
        },
        presets: function presets() {
            return (0, _get2.default)();
        }
    };

    var listeners = {
        toggle: [function (on) {
            return leds.on = on;
        }],
        interval: [function (interval) {
            return leds.interval = interval;
        }]
    };

    socket.broadcast = function (namespace, data, exclude) {
        wss.clients.forEach(function (client) {
            if (client.readyState === 1 && client.id !== exclude) {
                client.send(JSON.stringify([namespace, data]));
            }
        });
    };

    socket.init = function (namespace, handler) {
        if (init[namespace]) {
            (0, _noteLog2.default)('socket', 1, 'Init handler for \'' + namespace + '\' is set twice and will be overwritten.');
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

    socket.connect = function (ws) {
        ws.id = (0, _uuid2.default)();

        ws.transmit = function (namespace, data) {
            if (ws.readyState === 1) {
                ws.send(JSON.stringify([namespace, data]));
            }
        };

        Object.keys(init).forEach(function (handler) {
            Promise.resolve().then(function () {
                // init function may return value or promise
                return init[handler]();
            }).then(function (result) {
                ws.transmit(handler, result);
            });
        });

        ws.on('message', function (msg) {
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
                (0, _noteLog2.default)('socket', error);
            }
        });

        var ping = function ping() {
            ws.transmit('ping');

            setTimeout(ping, 5000);
        };

        ping();
    };

    return socket;
};