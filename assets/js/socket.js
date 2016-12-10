'use strict';

const config = require('config');
const store = require('./store.js');

const socket = new WebSocket(config.socket.host);

const updateSize = require('./actions/updateSize.js');
const updatePixels = require('./actions/updatePixels.js');
const updateRegulator = require('./actions/updateRegulator.js');

const updateRed = require('./actions/updateRed.js');
const updateGreen = require('./actions/updateGreen.js');
const updateBlue = require('./actions/updateBlue.js');

const updateHue = require('./actions/updateHue.js');
const updateSaturation = require('./actions/updateSaturation.js');
const updateValue = require('./actions/updateValue.js');

socket.addEventListener('message', msg => {
    const data = JSON.parse(msg.data);

    if(data[0] === 'meta') {
        store.dispatch(updateSize(data[1].width, data[1].height));
        store.dispatch(updateRegulator(data[1].regulator));
        store.dispatch(updatePixels(data[1].pixels));
    }

    if(data[0] === 'pixels') {
        store.dispatch(updatePixels(data[1]));
    }

    if(data[0] === 'rgb') {
        store.dispatch(updateRed(data[1].red));
        store.dispatch(updateGreen(data[1].green));
        store.dispatch(updateBlue(data[1].blue));
    }

    if(data[0] === 'hsv') {
        store.dispatch(updateHue(data[1].hue));
        store.dispatch(updateSaturation(data[1].saturation));
        store.dispatch(updateValue(data[1].value));
    }

    if(data[0] === 'presets') {
        store.dispatch({
            type: 'ADD_PRESET',
            data: data[1]
        });
    }

    if(data[0] === 'error') {
        console.log(new Error(data[1]));
    }
});

module.exports = socket;
