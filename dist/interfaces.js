'use strict';

var web = require('./interfaces/web.js');
var socket = require('./interfaces/socket.js');

module.exports = function (leds) {
    web(leds);
    socket(leds);
};