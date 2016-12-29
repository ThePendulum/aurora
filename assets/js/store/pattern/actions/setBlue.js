'use strict';

import convert from 'color-convert';
import pick from 'object.pick';

import socket from '../../../socket.js';

export default function(context, blue) {
    context.commit('setBlue', blue);

    if(Number.isNaN(context.state.red)) {
        context.commit('setRed', 0);
    }

    if(Number.isNaN(context.state.green)) {
        context.commit('setGreen', 0);
    }

    socket.send(JSON.stringify(['mode', 'rgb']));
    socket.send(JSON.stringify(['rgb', pick(context.state, ['red', 'green', 'blue'])]));

    const hsv = convert.rgb.hsv.raw(Number(context.state.red), Number(context.state.green), Number(context.state.blue));

    if(context.state.sync) {
        context.commit('setHue', hsv[0]);
        context.commit('setSaturation', hsv[1] / 100);
        context.commit('setValue', hsv[2] / 100);

        socket.send(JSON.stringify(['hsv', pick(context.state, ['hue', 'saturation', 'value'])]));
    }
};
