'use strict';

const hsvToRgb = require('../hsvToRgb.js');

module.exports = function(saturation, socket) {
    return function(dispatch, getState) {
        let color = getState().get('color');
        let hsv = color.get('hsv').toObject();
        let rgb = hsvToRgb(hsv.hue, saturation, hsv.value).rgb;
        const sync = color.get('sync');

        dispatch({
            type: 'UPDATE_SATURATION',
            data: saturation
        });

        if(Number.isNaN(hsv.hue)) {
            dispatch({
                type: 'UPDATE_HUE',
                data: 0
            });
        }

        if(Number.isNaN(hsv.value)) {
            dispatch({
                type: 'UPDATE_VALUE',
                data: 1
            });
        }

        color = getState().get('color');
        hsv = color.get('hsv').toObject();
        rgb = hsvToRgb(hsv.hue, hsv.saturation, hsv.value).rgb;

        if(socket) {
            socket.send(JSON.stringify(['mode', 'hsv']));
            socket.send(JSON.stringify(['hsv', hsv]));
        }

        if(sync) {
            dispatch({
                type: 'UPDATE_RED',
                data: rgb.red
            });

            dispatch({
                type: 'UPDATE_GREEN',
                data: rgb.green
            });

            dispatch({
                type: 'UPDATE_BLUE',
                data: rgb.blue
            });

            if(socket) {
                socket.send(JSON.stringify(['rgb', rgb]));
            }
        }
    };
};
