'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import pattern from './pattern';
import presets from './presets';

export default new Vuex.Store({
    modules: {
        pattern,
        presets
    }
});
