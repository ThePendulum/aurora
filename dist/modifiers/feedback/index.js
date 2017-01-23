'use strict';

var init = require('./init.js');
var each = require('./each.js');
var post = require('./post.js');

module.exports = function (leds) {
    return { init: init, each: each, post: post };
};