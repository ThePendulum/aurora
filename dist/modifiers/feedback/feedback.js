'use strict';

var post = require('./post.js');

module.exports = function (leds) {
    return { post: post };
};