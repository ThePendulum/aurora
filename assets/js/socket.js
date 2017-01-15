'use strict';

import config from 'config';
import convert from 'color-convert';

import store from './store';
import debounce from './utils/debounce.js';

const ws = new WebSocket(config.socket.host);
const socket = {};

const handlers = {
    rgb(rgb) {
        store.commit('red', rgb.red);
        store.commit('green', rgb.green);
        store.commit('blue', rgb.blue);

        const hsv = convert.rgb.hsv.raw(Number(rgb.red), Number(rgb.green), Number(rgb.blue));

        if(store.state.pattern.sync) {
            store.commit('hue', hsv[0]);
            store.commit('saturation', hsv[1] / 100);
            store.commit('value', hsv[2] / 100);
        }
    },
    hsv(hsv) {
        store.commit('hue', hsv.hue);
        store.commit('saturation', hsv.saturation);
        store.commit('value', hsv.value);

        const rgb = convert.hsv.rgb.raw(Number(hsv.hue), Number(hsv.saturation) * 100, Number(hsv.value) * 100) || [NaN, NaN, NaN];

        if(store.state.pattern.sync) {
            store.commit('red', rgb[0]);
            store.commit('green', rgb[1]);
            store.commit('blue', rgb[2]);
        }
    },
    meta(meta) {
        store.commit('width', meta.width);
        store.commit('height', meta.height);
    },
    modulation(modulation) { store.commit('modulation', modulation); },
    toggle(on) { store.commit('toggle', on); },
    presets(presets) { store.commit('addPresets', presets); },
    pixels(pixels) { store.commit('pixels', pixels); }
};

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
