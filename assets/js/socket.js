'use strict';

import config from 'config';
import convert from 'color-convert';

import store from './store';

const socket = new WebSocket(config.socket.host);

socket.addEventListener('message', msg => {
    const data = JSON.parse(msg.data);

    if(data[0] === 'rgb') {
        store.commit('setRed', data[1].red);
        store.commit('setGreen', data[1].green);
        store.commit('setBlue', data[1].blue);

        const hsv = convert.rgb.hsv.raw(Number(data[1].red), Number(data[1].green), Number(data[1].blue));

        if(store.state.pattern.sync) {
            store.commit('setHue', hsv[0]);
            store.commit('setSaturation', hsv[1] / 100);
            store.commit('setValue', hsv[2] / 100);
        }
    }

    if(data[0] === 'hsv') {
        store.commit('setHue', data[1].hue);
        store.commit('setSaturation', data[1].saturation);
        store.commit('setValue', data[1].value);

        const rgb = convert.hsv.rgb.raw(Number(data[1].hue), Number(data[1].saturation) * 100, Number(data[1].value) * 100) || [NaN, NaN, NaN];

        if(store.state.pattern.sync) {
            store.commit('setRed', rgb[0]);
            store.commit('setGreen', rgb[1]);
            store.commit('setBlue', rgb[2]);
        }
    }

    if(data[0] === 'modulation') {
        store.commit('setModulation', data[1]);
    }

    if(data[0] === 'meta') {
        store.commit('setWidth', data[1].width);
        store.commit('setHeight', data[1].height);
    }

    if(data[0] === 'pixels') {
        store.commit('setPixels', data[1]);
    }

    if(data[0] === 'presets') {
        store.commit('addPresets', data[1]);
    }
});

export default socket;
