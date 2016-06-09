'use strict';

const rgbToHsv = require('../rgbToHsv.js');

module.exports = function(newSync) {
  return function(dispatch, getState) {
    const sync = getState().get('color').get('sync');

    dispatch({
      type: 'UPDATE_SYNC',
      data: newSync === undefined ? !sync : newSync
    });
  };
};
