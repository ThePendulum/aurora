'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import pattern from './pattern';
import presets from './presets';
import meta from './meta';

export default new Vuex.Store({
    modules: {
        pattern,
        presets,
        meta
    }
});
