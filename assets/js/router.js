'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Pattern from '../components/pattern/pattern.vue';

const routes = [{
    path: '/',
    name: 'home',
    redirect: {
        name: 'pattern'
    }
}, {
    path: '/pattern',
    name: 'pattern',
    component: Pattern
}];

export default new VueRouter({
    mode: 'history',
    routes
});
