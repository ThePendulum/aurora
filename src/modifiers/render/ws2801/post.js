'use strict';

const post = function(leds, pre, init) {
  init.write(new Buffer(pre));
};

module.exports = post;
