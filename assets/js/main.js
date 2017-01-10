'use strict';

require('../css/style.scss');
require('../css/login.scss');

require('babel-polyfill');

import Vue from 'vue';

import router from './router.js';
import store from './store';

import Container from '../components/container/container.vue';

new Vue({
    el: '#container',
    router,
    store,
    render(createElement) {
        return createElement(Container);
    }
});
