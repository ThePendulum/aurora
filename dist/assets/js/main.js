'use strict';

var config = require('./config.js');

var socket = new WebSocket(config.socket.host);
var hsv2rgb = require('./hsv2rgb.js');

var sample = document.querySelector('#sample');
var hue = document.querySelector('#hue-container');
var saturation = document.querySelector('#saturation-container');
var value = document.querySelector('#value-container');

var color = {
    hue: 0,
    saturation: 1,
    value: 1,
    red: 100,
    green: 0,
    blue: 0
};

socket.addEventListener('open', function () {
    var updateColor = function updateColor() {
        var rgb = hsv2rgb(color.hue, color.saturation, color.value);

        color.red = rgb.red;
        color.green = rgb.green;
        color.blue = rgb.blue;

        sample.style.background = rgb.string;

        /*
        hue.style.background = 'linear-gradient(to right, ' + hsv2rgb(0, color.saturation, color.value).string + ', ' + hsv2rgb(60, color.saturation, color.value).string + ', ' + hsv2rgb(120, color.saturation, color.value).string + ', ' + hsv2rgb(180, color.saturation, color.value).string + ', ' + hsv2rgb(240, color.saturation, color.value).string + ', ' + hsv2rgb(300, color.saturation, color.value).string + ', ' + hsv2rgb(360, color.saturation, color.value).string + ')';
        saturation.style.background = 'linear-gradient(to right, ' + hsv2rgb(color.hue, 0, color.value).string +', ' + hsv2rgb(color.hue, 1, color.value).string +')';
        value.style.background = 'linear-gradient(to right, ' + hsv2rgb(color.hue, color.saturation, 0).string +', ' + hsv2rgb(color.hue, color.saturation, 1).string +')';
        */

        socket.send(JSON.stringify(['pattern', 'values', color]));
    };

    document.querySelector('#interval').addEventListener('input', function (event) {
        socket.send(JSON.stringify(['interval', event.target.value]));
    });

    document.querySelector('#rgb').addEventListener('click', function (event) {
        socket.send(JSON.stringify(['pattern', 'mode', 'rgb']));
    });

    document.querySelector('#hsv').addEventListener('click', function (event) {
        socket.send(JSON.stringify(['pattern', 'mode', 'hsv']));
    });

    document.querySelector('#red').addEventListener('change', function (event) {
        color.red = Number(event.target.value);

        updateColor();
    });

    document.querySelector('#green').addEventListener('change', function (event) {
        color.green = Number(event.target.value);

        updateColor();
    });

    document.querySelector('#blue').addEventListener('change', function (event) {
        color.blue = Number(event.target.value);

        updateColor();
    });

    document.querySelector('#hue').addEventListener('input', function (event) {
        // color.hue = Number(event.target.value);
        color.hue = event.target.value;

        updateColor();
    });

    document.querySelector('#saturation').addEventListener('input', function (event) {
        // color.saturation = Number(event.target.value / 100);
        color.saturation = event.target.value;

        updateColor();
    });

    document.querySelector('#value').addEventListener('input', function (event) {
        color.value = event.target.value;
        // color.value = Number(event.target.value / 100);

        updateColor();
    });
});