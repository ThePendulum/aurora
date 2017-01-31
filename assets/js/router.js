'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Pattern from '../components/pattern/pattern.vue';
import Draw from '../components/draw/draw.vue';
import Filters from '../components/filters/filters.vue';

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
}, {
    path: '/draw',
    name: 'draw',
    component: Draw
}, {
    path: '/filters',
    name: 'filters',
    component: Filters
}];

export default new VueRouter({
    mode: 'history',
    routes
});
