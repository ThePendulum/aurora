'use strict';

const defaultState = require('../state.js').get('rgb');

module.exports = function(state = defaultState, action) {
  const handlers = {};

  handlers.UPDATE_RED = function(value) {
    return state.set('red', value);
  };

  handlers.UPDATE_GREEN = function(value) {
    return state.set('green', value);
  };

  handlers.UPDATE_BLUE = function(value) {
    return state.set('blue', value);
  };

  if(handlers[action.type]) {
    return handlers[action.type](action.data);
  }

  return state;
};
