'use strict';

const defaultState = require('../state.js').get('hsv');

module.exports = function(state = defaultState, action) {
    const handlers = {};

    handlers.UPDATE_HUE = function(value) {
        return state.set('hue', value);
    };

    handlers.UPDATE_SATURATION = function(value) {
        return state.set('saturation', value);
    };

    handlers.UPDATE_VALUE = function(value) {
        return state.set('value', value);
    };

    if(handlers[action.type]) {
        return handlers[action.type](action.data);
    }

    return state;
};
