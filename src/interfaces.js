'use strict';

const web = require('./interfaces/web.js');
const socket = require('./interfaces/socket.js');

module.exports = function(leds) {
    web(leds);
    socket(leds);
};
