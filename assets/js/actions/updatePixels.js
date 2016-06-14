'use strict';

const socket = require('../socket.js');

module.exports = function(pixels) {
  return function(dispatch, getState) {
    dispatch({
      type: 'UPDATE_PIXELS',
      data: pixels
    });
  };
};
