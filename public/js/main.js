(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    socket: {
        host: 'ws://84.25.144.220:3001'
    }
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function(h, s, v){
    let r, g, b;

    h = Math.abs(h % 360) / 360;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch(i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    const rgb = {
        red: Math.floor(r * 255),
        green: Math.floor(g * 255),
        blue: Math.floor(b * 255)
    };

    rgb.array = [rgb.red, rgb.green, rgb.blue];
    rgb.string = 'rgb(' + rgb.red + ', ' + rgb.green + ', ' + rgb.blue + ')';

    return rgb;
};

},{}],3:[function(require,module,exports){
'use strict';

const config = require('./config.js');

const socket = new WebSocket(config.socket.host);
const hsv2rgb = require('./hsv2rgb.js');

const pattern = {
    red: 50,
    green: 0,
    blue: 0
};


socket.addEventListener('open', () => {
    /*
    hue.style.background = 'linear-gradient(to right, ' + hsv2rgb(0, color.saturation, color.value).string + ', ' + hsv2rgb(60, color.saturation, color.value).string + ', ' + hsv2rgb(120, color.saturation, color.value).string + ', ' + hsv2rgb(180, color.saturation, color.value).string + ', ' + hsv2rgb(240, color.saturation, color.value).string + ', ' + hsv2rgb(300, color.saturation, color.value).string + ', ' + hsv2rgb(360, color.saturation, color.value).string + ')';
    saturation.style.background = 'linear-gradient(to right, ' + hsv2rgb(color.hue, 0, color.value).string +', ' + hsv2rgb(color.hue, 1, color.value).string +')';
    value.style.background = 'linear-gradient(to right, ' + hsv2rgb(color.hue, color.saturation, 0).string +', ' + hsv2rgb(color.hue, color.saturation, 1).string +')';
    */

    socket.send(JSON.stringify(['pattern', 'values', pattern]));
});

},{"./config.js":1,"./hsv2rgb.js":2}]},{},[3]);
