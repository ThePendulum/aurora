'use strict';

const note = require('note-log');
const util = require('util');

const init = function(leds, socket) {
    const canvas = Array.from({
        length: leds.width
    }, (value, index) => {
        return Array.from({
            length: leds.height
        }, pixel => {
            return null;
        });
    });

    socket.init('canvas', () => {
        return canvas;
    });

    socket.listen('draw', pencil => {
        canvas[pencil.x][pencil.y] = pencil.pencil;
    });

    socket.listen('fill', pencil => {
        canvas.forEach((column, columnIndex) => {
            column.forEach((row, rowIndex) => {
                canvas[columnIndex][rowIndex] = pencil;
            });
        });
    });

    return {canvas};
};

module.exports = init;
