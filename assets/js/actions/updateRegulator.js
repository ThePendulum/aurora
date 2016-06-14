'use strict';

const socket = require('../socket.js');

module.exports = function(regulator) {
  return function(dispatch, getState) {
    dispatch({
      type: 'UPDATE_REGULATOR',
      data: regulator
    });
  };
};
