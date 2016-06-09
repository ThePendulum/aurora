'use strict';

const defaultState = require('../state.js').get('canvas');
const rgbToHsv = require('../rgbToHsv.js');

module.exports = function(state = defaultState, action) {
  const handlers = {};

  handlers.UPDATE_PIXEL = function(index, value) {
    return state.setIn(['canvas', 'pixels'], index, value);
  };

  if(handlers[action.type]) {
    return handlers[action.type](action.data);
  }

  return state;
};
