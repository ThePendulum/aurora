'use strict';

import convert from 'color-convert';
import pick from 'object.pick';

import socket from '../../../socket.js';

export default function(context, hue) {
    context.commit('hue', hue);

    if(Number.isNaN(context.state.saturation)) {
        context.commit('saturation', 1);
    }

    if(Number.isNaN(context.state.value)) {
        context.commit('value', 1);
    }

    socket.transmit('mode', 'hsv');
    socket.transmit('hsv', pick(context.state, ['hue', 'saturation', 'value']));

    const rgb = convert.hsv.rgb.raw(Number(context.state.hue), Number(context.state.saturation) * 100, Number(context.state.value) * 100) || [NaN, NaN, NaN];

    if(context.state.sync) {
        context.commit('red', rgb[0]);
        context.commit('green', rgb[1]);
        context.commit('blue', rgb[2]);

        socket.transmit('rgb', pick(context.state, ['red', 'green', 'blue']));
    }
};
