'use strict';

export default {
    width(state, width) {
        state.width = width;
    },
    height(state, height) {
        state.height = height;
    },
    pixels(state, pixels) {
        state.pixels = pixels;
    },
    toggle(state, on) {
        state.on = on;
    },
    modulation(state, modulation) {
        state.modulation = modulation;
    }
};
