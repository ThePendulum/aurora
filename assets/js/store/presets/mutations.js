'use strict';

export default {
    addPresets(state, presets) {
        state.presets.push(...presets);
    },
    removePresets(state, presetIds) {
        const map = new Set(presetIds);

        state.presets = state.presets.filter(preset => !map.has(preset.id));
    },
    clearPresets(state) {
        state.presets = [];
    }
};
