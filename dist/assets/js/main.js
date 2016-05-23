'use strict';

var config = require('./config.js');

var socket = new WebSocket(config.socket.host);
var hsv2rgb = require('./hsv2rgb.js');

var pattern = {
    red: 50,
    green: 0,
    blue: 0
};

socket.addEventListener('open', function () {
    /*
    hue.style.background = 'linear-gradient(to right, ' + hsv2rgb(0, color.saturation, color.value).string + ', ' + hsv2rgb(60, color.saturation, color.value).string + ', ' + hsv2rgb(120, color.saturation, color.value).string + ', ' + hsv2rgb(180, color.saturation, color.value).string + ', ' + hsv2rgb(240, color.saturation, color.value).string + ', ' + hsv2rgb(300, color.saturation, color.value).string + ', ' + hsv2rgb(360, color.saturation, color.value).string + ')';
    saturation.style.background = 'linear-gradient(to right, ' + hsv2rgb(color.hue, 0, color.value).string +', ' + hsv2rgb(color.hue, 1, color.value).string +')';
    value.style.background = 'linear-gradient(to right, ' + hsv2rgb(color.hue, color.saturation, 0).string +', ' + hsv2rgb(color.hue, color.saturation, 1).string +')';
    */

    socket.send(JSON.stringify(['pattern', 'values', pattern]));
});