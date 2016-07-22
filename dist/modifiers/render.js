'use strict';

var config = require('config');

var init = function init(leds, ws) {
  ws.on('connection', function (wss) {
    var update = function update() {
      wss.transfer('meta', {
        size: config.size,
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

module.exports = { init: init };