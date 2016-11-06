'use strict';

const Immutable = require('immutable');

const defaultState = require('../state.js').get('spec');
const rgbToHsv = require('../rgbToHsv.js');

module.exports = function(state = defaultState, action) {
  const handlers = {};

  handlers.UPDATE_SIZE = function(dimensions) {
    return state.set('width', dimensions.width).set('height', dimensions.height);
  };

  handlers.UPDATE_REGULATOR = function(regulator) {
    return state.set('regulator', regulator);
  };

  handlers.UPDATE_PIXELS = function(pixels) {
    return state.set('pixels', Immutable.List(pixels));
  };

  if(handlers[action.type]) {
    return handlers[action.type](action.data);
  }

  return state;
};
