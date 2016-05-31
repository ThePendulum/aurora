'use strict';

var config = require('config');
var util = require('util');
var note = require('note-log');
var WebSocket = require('ws').Server;
var uuid = require('uuid');
var math = require('mathjs');

module.exports = function (leds) {
  var ws = new WebSocket({ port: config.get('socket.port') });

  note('wss', 'Socket server listening on port ' + config.get('socket.port'));

  ws.on('connection', function (wss) {
    wss.id = uuid();

    var connected = true;

    var ops = {
      interval: function interval(value) {
        leds.interval = parseInt(value);
      },
      mode: function mode(value) {
        leds.mode = value;
      },
      rgb: function rgb(values) {
        Object.entries(values).forEach(function (entry) {
          leds.rgb[entry[0]] = {
            value: entry[1],
            eval: math.compile(entry[1]).eval
          };
        });
      },
      hsv: function hsv(values) {
        Object.entries(values).forEach(function (entry) {
          leds.hsv[entry[0]] = {
            value: entry[1],
            eval: math.compile(entry[1]).eval
          };
        });
      }
    };

    wss.on('message', function (data) {
      var selector = JSON.parse(data);

      var operation = selector.slice(0, -1).reduce(function (acc, property) {
        return acc[property];
      }, ops);

      if (operation) {
        // broadcast input
        if (connected) {
          ws.clients.forEach(function (client) {
            // don't broadcast to self
            if (client.id !== wss.id) {
              client.send(data);
            }
          });
        }

        try {
          operation(selector.slice(-1)[0]);
        } catch (error) {
          note('wss', 2, error.message);
        }
      };
    });

    ws.clients.forEach(function (client) {
      client.send(JSON.stringify(['interval', leds.interval]));
      client.send(JSON.stringify(['mode', leds.mode]));
      client.send(JSON.stringify(['rgb', { red: leds.rgb.red.value, green: leds.rgb.green.value, blue: leds.rgb.blue.value }]));
      client.send(JSON.stringify(['hsv', { hue: leds.hsv.hue.value, saturation: leds.hsv.saturation.value, value: leds.hsv.value.value }]));
    });

    var updateSample = function updateSample() {
      if (connected) {
        wss.send(JSON.stringify(['pixels', leds.pixels]));

        /*
        setTimeout(() => {
          updateSample();
        }, 5000);
        */
      }
    };

    updateSample();

    wss.on('close', function () {
      connected = false;
    });
  });
};