'use strict';

const config = require('config');
const util = require('util');
const note = require('note-log');
const WebSocket = require('ws').Server;
const uuid = require('uuid');
const math = require('mathjs');
const knex = require('../knex.js');

const port = config.has('socket.port') ? config.socket.port : 3001;

module.exports = function(leds) {
  const ws = new WebSocket({port});

  note('wss', 'Socket server listening on port ' + port);

  ws.on('connection', wss => {
    note('socket', 0, `Established websocket with '${wss.upgradeReq.headers['x-forwarded-for'] || ws.upgradeReq.connection.remoteAddress}'`);

    wss.id = uuid();

    wss.transfer = function(namespace, ...data) {
      if(wss.readyState === 1) {
        wss.send(JSON.stringify([namespace, ...data]));
      }
    };

    wss.broadcast = function(namespace, ...data) {
      ws.clients.forEach(client => {
        if(wss.readyState === 1 && client.id !== wss.id) {
          client.send(JSON.stringify([namespace, ...data]));
        }
      });
    };

    wss.transfer('meta', {
      width: leds.width,
      height: leds.height,
      pixels: leds.pixels,
      regulator: config.regulator,
      interval: leds.interval
    });

    wss.transfer('interval', leds.interval);
    wss.transfer('mode', leds.mode);

    knex('presets').select().then(presets => {
        wss.transfer('presets', presets);
    }).catch(error => {
        note(error);
    });

    const update = function() {
      wss.transfer('pixels', leds.pixels);

      if(wss.readyState === 1) {
        setTimeout(() => {
          update();
        }, config.has('socket.previewInterval') ? config.socket.previewInterval : 1000);
      }
    };

    update();

    wss.on('message', msg => {
      const data = JSON.parse(msg);

      if(data[0] === 'mode') {
        leds.mode = data[1];
      }

      if(data[0] === 'interval') {
        leds.interval = data[1];
      }
    });

    wss.on('close', () => {
      note('socket', 0, `Closed websocket with '${wss.upgradeReq.headers['x-forwarded-for'] || ws.upgradeReq.connection.remoteAddress}'`);
    });
  });

  return ws;
};
