'use strict';

var post = function post(leds, pre, init) {
    init.render.write(new Buffer(init.buffer));
};

module.exports = post;