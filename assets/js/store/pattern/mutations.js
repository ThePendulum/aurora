'use strict';

export default {
    red(state, red) {
        state.red = red;
    },
    green(state, green) {
        state.green = green;
    },
    blue(state, blue) {
        state.blue = blue;
    },
    hue(state, hue) {
        state.hue = hue;
    },
    saturation(state, saturation) {
        state.saturation = saturation;
    },
    value(state, value) {
        state.value = value;
    },
    setSync(state, sync) {
        state.sync = sync;
    }
};
