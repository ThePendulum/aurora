'use strict';

var post = function post(leds, pre, init, socket) {
    if (leds.beat % 10 === 0) {
        socket.broadcast('pixels', leds.pixels);
    }
};

module.exports = post;