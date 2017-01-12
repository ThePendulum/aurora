'use strict';

import convert from 'color-convert';
import pick from 'object.pick';

import socket from '../../../socket.js';

export default function(context, blue) {
    context.commit('blue', blue);

    if(Number.isNaN(context.state.red)) {
        context.commit('red', 0);
    }

    if(Number.isNaN(context.state.green)) {
        context.commit('green', 0);
    }

    socket.transmit('mode', 'rgb');
    socket.transmit('rgb', pick(context.state, ['red', 'green', 'blue']));

    const hsv = convert.rgb.hsv.raw(Number(context.state.red), Number(context.state.green), Number(context.state.blue));

    if(context.state.sync) {
        context.commit('hue', hsv[0]);
        context.commit('saturation', hsv[1] / 100);
        context.commit('value', hsv[2] / 100);
    }
};
