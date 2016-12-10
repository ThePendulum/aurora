'use strict';

const defaultState = require('../state.js').get('presets');

module.exports = function(state = defaultState, action) {
  const handlers = {};

  handlers.ADD_PRESET = function(presets) {
    return state.push(...presets);
  };

  if(handlers[action.type]) {
    return handlers[action.type](action.data);
  }

  return state;
};
