'use strict';

const init = require('./init.js');
const each = require('./each.js');
const post = require('./post.js');

module.exports = function(leds) {
    return {init, each, post};
};
