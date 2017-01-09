'use strict';

export default {
    setWidth(state, width) {
        state.width = width;
    },
    setHeight(state, height) {
        state.height = height;
    },
    setPixels(state, pixels) {
        state.pixels = pixels;
    },
    toggle(state, on) {
        state.on = on;
    }
};
