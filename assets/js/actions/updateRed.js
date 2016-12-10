'use strict';

const rgbToHsv = require('../rgbToHsv.js');

module.exports = function(red, socket) {
    return function(dispatch, getState) {
        let color = getState().get('color');
        let rgb = color.get('rgb').toObject();
        let hsv = rgbToHsv(red, rgb.green, rgb.blue).hsv;
        const sync = color.get('sync');

        dispatch({
            type: 'UPDATE_RED',
            data: red
        });

        if(Number.isNaN(rgb.green)) {
            dispatch({
                type: 'UPDATE_GREEN',
                data: 255
            });
        }

        if(Number.isNaN(rgb.blue)) {
            dispatch({
                type: 'UPDATE_BLUE',
                data: 255
            });
        }

        color = getState().get('color');
        rgb = color.get('rgb').toObject();
        hsv = rgbToHsv(rgb.red, rgb.green, rgb.blue).hsv;

        if(socket) {
            socket.send(JSON.stringify(['mode', 'rgb']));
            socket.send(JSON.stringify(['rgb', rgb]));
        }

        if(sync) {
            dispatch({
                type: 'UPDATE_HUE',
                data: hsv.hue
            });

            dispatch({
                type: 'UPDATE_SATURATION',
                data: hsv.saturation
            });

            dispatch({
                type: 'UPDATE_VALUE',
                data: hsv.value
            });

            if(socket) {
                socket.send(JSON.stringify(['hsv', hsv]));
            }
        }
    };
};
