'use strict';

import config from 'config';
import convert from 'color-convert';

import store from './store';

const socket = new WebSocket(config.socket.host);

socket.addEventListener('message', msg => {
    const data = JSON.parse(msg.data);

    const handlers = {
        rgb(rgb) {
            store.commit('setRed', rgb.red);
            store.commit('setGreen', rgb.green);
            store.commit('setBlue', rgb.blue);

            const hsv = convert.rgb.hsv.raw(Number(data[1].red), Number(data[1].green), Number(data[1].blue));

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

            const rgb = convert.hsv.rgb.raw(Number(data[1].hue), Number(data[1].saturation) * 100, Number(data[1].value) * 100) || [NaN, NaN, NaN];

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
        modulation(modulation) { store.commit('setModulation', data[1]); },
        toggle(on) { store.commit('toggle', on); },
        presets(presets) { store.commit('addPresets', presets); },
        pixels(pixels) { store.commit('setPixels', pixels); }
    };

    if(handlers[data[0]]) {
        handlers[data[0]](data[1]);
    }
});

export default socket;
