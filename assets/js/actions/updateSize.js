'use strict';

const socket = require('../socket.js');

module.exports = function(width, height) {
  return function(dispatch, getState) {
    dispatch({
      type: 'UPDATE_SIZE',
      data: {width, height}
    });
  };
};
