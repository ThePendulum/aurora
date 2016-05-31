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

    let connected = true;

    const ops = {
      interval: function(value) {
        leds.interval = parseInt(value);
      },
      mode: function(value) {
        leds.mode = value;
      },
      rgb: function(values) {
        Object.entries(values).forEach(entry => {
          leds.rgb[entry[0]] = {
            value: entry[1],
            eval: math.compile(entry[1]).eval
          };
        });
      },
      hsv: function(values) {
        Object.entries(values).forEach(entry => {
          leds.hsv[entry[0]] = {
            value: entry[1],
            eval: math.compile(entry[1]).eval
          };
        });
      }
    };

    wss.on('message', data => {
      const selector = JSON.parse(data);

      const operation = selector.slice(0, -1).reduce((acc, property) => {
        return acc[property];
      }, ops);

      if(operation) {
        // broadcast input
        if(connected) {
          ws.clients.forEach(client => {
            // don't broadcast to self
            if(client.id !== wss.id) {
              client.send(data);
            }
          });
        }

        try {
          operation(selector.slice(-1)[0]);
        } catch(error) {
          note('wss', 2, error.message);
        }
      };
    });

    ws.clients.forEach(client => {
      client.send(JSON.stringify(['interval', leds.interval]));
      client.send(JSON.stringify(['mode', leds.mode]));
      client.send(JSON.stringify(['rgb', {red: leds.rgb.red.value, green: leds.rgb.green.value, blue: leds.rgb.blue.value}]));
      client.send(JSON.stringify(['hsv', {hue: leds.hsv.hue.value, saturation: leds.hsv.saturation.value, value: leds.hsv.value.value}]));
    });

    const updateSample = function() {
      if(connected) {
        wss.send(JSON.stringify(['pixels', leds.pixels]));

        /*
        setTimeout(() => {
          updateSample();
        }, 5000);
        */
      }
    };

    updateSample();

    wss.on('close', () => {
      connected = false;
    });
  });
};
