'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import pattern from './pattern';

export default new Vuex.Store({
    modules: {
        pattern
    }
});
