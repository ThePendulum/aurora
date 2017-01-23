'use strict';

var note = require('note-log');
var util = require('util');

var init = function init(leds, socket) {
    var canvas = Array.from({
        length: leds.width
    }, function (value, index) {
        return Array.from({
            length: leds.height
        }, function (pixel) {
            return null;
        });
    });

    socket.init('canvas', function () {
        return canvas;
    });

    socket.listen('draw', function (pencil) {
        canvas[pencil.x][pencil.y] = pencil.pencil;
    });

    socket.listen('fill', function (pencil) {
        canvas.forEach(function (column, columnIndex) {
            column.forEach(function (row, rowIndex) {
                canvas[columnIndex][rowIndex] = pencil;
            });
        });
    });

    return { canvas: canvas };
};

module.exports = init;