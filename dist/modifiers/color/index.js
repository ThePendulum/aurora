'use strict';

var init = require('./init.js');
var pre = require('./pre.js');
var each = require('./each.js');

module.exports = function (leds) {
    return { init: init, pre: pre, each: each };
};