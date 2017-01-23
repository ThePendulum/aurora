'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import meta from './meta';
import presets from './presets';
import pattern from './pattern';
import draw from './draw';

export default new Vuex.Store({
    modules: {
        meta,
        presets,
        pattern,
        draw
    }
});
