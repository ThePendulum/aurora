'use strict';

import config from 'config';
import convert from 'color-convert';

import store from './store';

const handlers = {
    rgb(rgb) {
        store.commit('setRed', rgb.red);
        store.commit('setGreen', rgb.green);
        store.commit('setBlue', rgb.blue);

        const hsv = convert.rgb.hsv.raw(Number(rgb.red), Number(rgb.green), Number(rgb.blue));

        if(store.state.pattern.sync) {
            store.commit('setHue', hsv[0]);
            store.commit('setSaturation', hsv[1] / 100);
            store.commit('setValue', hsv[2] / 100);
        }
    },
    hsv(hsv) {
        store.commit('setHue', hsv.hue);
        store.commit('setSaturation', hsv.saturation);
        store.commit('setValue', hsv.value);

        const rgb = convert.hsv.rgb.raw(Number(hsv.hue), Number(hsv.saturation) * 100, Number(hsv.value) * 100) || [NaN, NaN, NaN];

        if(store.state.pattern.sync) {
            store.commit('setRed', rgb[0]);
            store.commit('setGreen', rgb[1]);
            store.commit('setBlue', rgb[2]);
        }
    },
    meta(meta) {
        store.commit('setWidth', meta.width);
        store.commit('setHeight', meta.height);
    },
    modulation(modulation) { store.commit('setModulation', modulation); },
    toggle(on) { store.commit('toggle', on); },
    presets(presets) { store.commit('addPresets', presets); },
    pixels(pixels) { store.commit('setPixels', pixels); }
};

const ws = new WebSocket(config.socket.host);
const socket = {};

socket.transmit = function(namespace, data) {
    ws.send(JSON.stringify([namespace, data]));
};

ws.addEventListener('message', msg => {
    const data = JSON.parse(msg.data);

    if(handlers[data[0]]) {
        handlers[data[0]](data[1]);
    }
});

export default socket;
