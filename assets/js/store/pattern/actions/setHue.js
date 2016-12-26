'use strict';

import convert from 'color-convert';

export default function(context, hue) {
    context.commit('setHue', hue);

    if(Number.isNaN(context.state.saturation)) {
        context.commit('setSaturation', 1);
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
