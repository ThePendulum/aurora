'use strict';

var config = require('config');
var note = require('note-log');
var ws281x = require('rpi-ws281x-native');

var colorIndex = config.colorIndex || [0, 1, 2];

var r = colorIndex[0];
var g = colorIndex[1];
var b = colorIndex[2];

var pre = function pre(leds, initResults) {
  leds.buffer = [];
};

var each = function each(pixel, leds, preResults, initResults) {
  var chips = {};

  chips.ws2801 = function () {};

  chips.ws281x = function () {
    leds.buffer.push(((pixel.values[r] & 0xff) << 16) + ((pixel.values[g] & 0xff) << 8) + (pixel.values[b] & 0xff));
  };

  chips.usb = chips.ws2801;

  chips[leds.chip]();

  return pixel.values;
};

var post = function post(leds, pre, init) {
  var chips = {};

  chips.ws2801 = function () {
    leds.spi.write(new Buffer(leds.buffer));
  };

  chips.ws281x = function () {
    ws281x.render(new Uint32Array(leds.buffer));
  };

  chips.usb = function () {
    if (leds.usb.isOpen()) {
      leds.usb.write(new Buffer(leds.buffer));
    }
  };

  chips[leds.chip]();
};

var init = function init(leds, ws) {
  ws.on('connection', function (wss) {
    var update = function update() {
      var width = void 0,
          height = void 0;

      if (Array.isArray(config.size)) {
        width = config.size[0];
        height = config.size[1];
      } else {
        width = config.size;
        height = 1;
      }

      wss.transfer('spec', {
        width: width,
        height: height,
        pixels: leds.pixels,
        regulator: config.regulator
      });

      setTimeout(function () {
        update();
      }, config.socket.previewUpdateInterval || 1000);
    };

    update();
  });
};

module.exports = { init: init, pre: pre, each: each, post: post };