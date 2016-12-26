'use strict';

import convert from 'color-convert';

export default function(context, red) {
    context.commit('setRed', red);

    if(Number.isNaN(context.state.green)) {
        context.commit('setGreen', 0);
    }

    if(Number.isNaN(context.state.blue)) {
        context.commit('setBlue', 0);
    }

    const hsv = convert.rgb.hsv.raw(Number(context.state.red), Number(context.state.green), Number(context.state.blue));

    if(context.state.sync) {
        context.commit('setHue', hsv[0]);
        context.commit('setSaturation', hsv[1] / 100);
        context.commit('setValue', hsv[2] / 100);
    }
};
