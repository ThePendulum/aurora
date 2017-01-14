'use strict';

const init = require('./init.js');
const pre = require('./pre.js');
const each = require('./each.js');

module.exports = function(leds) {
    return {init, pre, each};
};
