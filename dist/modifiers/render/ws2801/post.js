'use strict';

var post = function post(leds, pre, init) {
  init.write(new Buffer(pre));
};

module.exports = post;