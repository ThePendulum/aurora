'use strict';

var config = require('config');

var post = function post(leds, pre, init, socket) {
    // let beat tick to approximate configured feedback interval
    if (leds.beat % Math.round(config.feedbackInterval / leds.interval) === 0) {
        socket.broadcast('pixels', leds.pixels);
    }
};

module.exports = post;