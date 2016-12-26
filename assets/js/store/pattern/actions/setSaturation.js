'use strict';

import convert from 'color-convert';

export default function(context, saturation) {
    context.commit('setSaturation', saturation);

    if(Number.isNaN(context.state.hue)) {
        context.commit('setHue', 0);
    }

    if(Number.isNaN(context.state.value)) {
        context.commit('setValue', 1);
    }

    const rgb = convert.hsv.rgb.raw(Number(context.state.hue), Number(context.state.saturation) * 100, Number(context.state.value) * 100);

    if(context.state.sync) {
        context.commit('setRed', rgb[0]);
        context.commit('setGreen', rgb[1]);
        context.commit('setBlue', rgb[2]);
    }
};
