'use strict';

const init = require('./init.js');
const each = require('./each.js');

module.exports = function(leds) {
    return {init, each};
};
