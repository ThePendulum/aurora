'use strict';

import config from 'config';
import util from 'util';
import note from 'note-log';
import {Server as WebSocket} from 'ws';
import uuid from 'uuid';

import leds from './init.js';
import knex from './knex.js';

import getPresets from './presets/get.js';

module.exports = function(wss, leds) {
    const socket = {};

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
        toggle() { return leds.on; },
        presets() { return getPresets(); }
    };

    const listeners = {
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

    socket.listen = function(namespace, handler, forward, bounce) {
        const proxyHandler = function(data, id) {
            handler(data);

            if(forward !== false) {
                socket.broadcast(namespace, data, bounce === true ? null : id);
            }
        };

        if(listeners[namespace]) {
            listeners[namespace].push(proxyHandler);
        } else {
            listeners[namespace] = [proxyHandler];
        }
    };

    socket.connect = ws => {
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
                    listeners[namespace].forEach(listener => listener(data, ws.id));
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
    };

    return socket;
};
