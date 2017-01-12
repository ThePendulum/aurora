'use strict';

const config = require('config');
const util = require('util');
const note = require('note-log');
const WebSocket = require('ws').Server;
const uuid = require('uuid');
const math = require('mathjs');

const leds = require('./init.js');
const knex = require('./knex.js');

const getPresets = require('./presets/get.js');

const port = config.has('socket.port') ? config.socket.port : 3001;

module.exports = function(leds) {
    const wss = new WebSocket({port});
    const socket = {};

    note('wss', 'Socket server listening on port ' + port);

    const init = {
        meta() {
            return {
                width: leds.width,
                height: leds.height,
                regulator: config.regulator,
                interval: leds.interval
            };
        },
        interval() { return leds.interval; },
        mode() { return leds.mode; },
        toggle() { return leds.on; },
        presets() { return getPresets(); }
    };

    const listeners = {
        mode: [mode => { leds.mode = mode; }],
        toggle: [on => leds.on = on],
        interval: [interval => leds.interval = interval]
    };

    socket.broadcast = function(namespace, data, exclude) {
        wss.clients.forEach(client => {
            if(client.readyState === 1 && client.id !== exclude) {
                client.send(JSON.stringify([namespace, data]));
            }
        });
    };

    socket.init = function(namespace, handler) {
        if(init[namespace]) {
            note('socket', 1, `Init handler for \'${namespace}\' is set twice and will be overwritten.`);
        }

        init[namespace] = handler;
    };

    socket.listen = function(namespace, handler, proxy) {
        const proxyHandler = function(data) {
            handler(data);

            if(proxy !== false) {
                socket.broadcast(namespace, data);
            }
        };

        if(listeners[namespace]) {
            listeners[namespace].push(proxyHandler);
        }

        listeners[namespace] = [proxyHandler];
    };

    wss.on('connection', ws => {
        note('socket', 0, `Established websocket with \'${ws.upgradeReq.headers['x-forwarded-for'] || ws.upgradeReq.connection.remoteAddress}\'`);

        ws.id = uuid();

        ws.transmit = function(namespace, data) {
            if(ws.readyState === 1) {
                ws.send(JSON.stringify([namespace, data]));
            }
        };

        Object.keys(init).forEach(handler => {
            Promise.resolve().then(() => {
                // init function may return value or promise
                return init[handler]();
            }).then(result => {
                ws.transmit(handler, result);
            });
        });

        ws.on('message', msg => {
            try {
                const [namespace, data] = JSON.parse(msg);

                if(listeners[namespace]) {
                    listeners[namespace].forEach(listener => listener(data));
                }
            } catch(error) {
                note('socket', error);
            }
        });

        const ping = function() {
            ws.transmit('ping');

            setTimeout(ping, 5000);
        };

        ping();

        ws.on('close', () => {
            note('socket', 0, `Closed websocket with '${ws.upgradeReq.headers['x-forwarded-for'] || ws.upgradeReq.connection.remoteAddress}'`);
        });
    });

    return socket;
};
