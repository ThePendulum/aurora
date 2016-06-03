'use strict';

const config = require('config');
const util = require('util');
const note = require('note-log');
const WebSocket = require('ws').Server;
const uuid = require('uuid');
const math = require('mathjs');

module.exports = function(leds) {
  const ws = new WebSocket({port: config.get('socket.port')});

  note('wss', 'Socket server listening on port ' + config.get('socket.port'));

  ws.on('connection', wss => {
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

    wss.transfer('interval', leds.interval);
    wss.transfer('mode', leds.mode);

    wss.on('message', msg => {
      const data = JSON.parse(msg);

      if(data[0] === 'mode') {
        leds.mode = data[1];
      }

      if(data[0] === 'interval') {
        leds.interval = data[1];
      }
    });
  });

  return ws;
};
