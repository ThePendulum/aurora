'use strict';

const config = require('config');
const util = require('util');
const note = require('note-log');
const ws = require('ws').Server;
const math = require('mathjs');

module.exports = function(leds) {
  const wss = new ws({port: config.get('socket.port')});

  note('socket', 'Socket server listening on port ' + config.get('socket.port'));

  wss.on('connection', socket => {
    const ops = {
      interval: function(value) {
        leds.interval = value;
      },
      pattern: {
        mode: function(value) {
          leds.pattern.mode = value;
        },
        values: function(values) {
          Object.keys(values).forEach(property => {
            leds.pattern[property] = {
              value: values[property],
              eval: math.compile(values[property]).eval
            }
          });
        },
      }
    };

    socket.on('message', msg => {
      const selector = JSON.parse(msg);

      const operation = selector.slice(0, -1).reduce((acc, property) => {
        return acc[property];
      }, ops);

      if(operation) {
        try {
          operation(selector.slice(-1)[0]);
        } catch(error) {
          note('socket', 2, error.message);
        }
      };
    });
  });
};
