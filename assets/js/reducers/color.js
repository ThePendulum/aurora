'use strict';

const defaultState = require('../state.js').get('color');
const rgbToHsv = require('../rgbToHsv.js');

module.exports = function(state = defaultState, action) {
  const handlers = {};

  handlers.UPDATE_RED = function(value) {
    return state.setIn(['rgb', 'red'], value);
  };

  handlers.UPDATE_GREEN = function(value) {
    return state.setIn(['rgb', 'green'], value);
  };

  handlers.UPDATE_BLUE = function(value) {
    return state.setIn(['rgb', 'blue'], value);
  };

  handlers.UPDATE_HUE = function(value) {
    return state.setIn(['hsv', 'hue'], value);
  };

  handlers.UPDATE_SATURATION = function(value) {
    return state.setIn(['hsv', 'saturation'], value);
  };

  handlers.UPDATE_VALUE = function(value) {
    return state.setIn(['hsv', 'value'], value);
  };

  handlers.UPDATE_SYNC = function(value) {
    return state.set('sync', value);
  };

  if(handlers[action.type]) {
    return handlers[action.type](action.data);
  }

  return state;
};
