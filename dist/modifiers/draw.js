'use strict';

var config = require('config');
var note = require('note-log');

var init = function init(leds, ws) {
  var canvas = Array.apply(null, new Array(leds.pixels.length)).map(function (value) {
    return null;
  });

  ws.on('connection', function (wss) {
    wss.on('message', function (msg) {
      var data = JSON.parse(msg);

      if (data[0] === 'draw') {
        var x = data[1][0];
        var y = data[1][1];
        var value = data[1][2];

        var index = y * config.size[1] + (y % 2 ? config.size[0] - 1 - x : x);

        canvas[index] = value;
      }
    });
  });

  return canvas;
};

var each = function each(pixel, leds, pre, init) {
  var canvas = init;

  if (canvas[pixel.index] === null) {
    return pixel.values;
  }

  return canvas[pixel.index];
};

module.exports = { init: init, each: each };