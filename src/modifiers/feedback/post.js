'use strict';

const post = function(leds, pre, init, socket) {
    if(leds.beat % 10 === 0) {
        socket.broadcast('pixels', leds.pixels);
    }
};

module.exports = post;
