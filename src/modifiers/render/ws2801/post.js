'use strict';

const post = function(leds, pre, init) {
    init.render.write(new Buffer(init.buffer));
};

module.exports = post;
