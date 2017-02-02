'use strict';

var init = require('./init.js');
var each = require('./each.js');

module.exports = function (leds) {
    return { init: init, each: each };
};