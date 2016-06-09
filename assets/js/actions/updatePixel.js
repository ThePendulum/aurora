'use strict';

const socket = require('../socket.js');

module.exports = function(index, pixel) {
  return function(dispatch, getState) {
    dispatch({
      type: 'UPDATE_PIXEL',
      data: [index, pixel]
    });
  };
};
