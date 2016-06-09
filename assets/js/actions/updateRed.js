'use strict';

const rgbToHsv = require('../rgbToHsv.js');

module.exports = function(red, socket) {
  return function(dispatch, getState) {
    const color = getState().get('color');
    const rgb = color.get('rgb').toObject();
    const hsv = rgbToHsv(red, rgb.green, rgb.blue).hsv;
    const sync = color.get('sync');

    dispatch({
      type: 'UPDATE_RED',
      data: red
    });

    if(socket) {
      socket.send(JSON.stringify(['mode', 'rgb']));
      socket.send(JSON.stringify(['rgb', {...rgb, red}]));
    }

    if(sync) {
      dispatch({
        type: 'UPDATE_HUE',
        data: hsv.hue
      });

      dispatch({
        type: 'UPDATE_SATURATION',
        data: hsv.saturation
      });

      dispatch({
        type: 'UPDATE_VALUE',
        data: hsv.value
      });

      if(socket) {
        socket.send(JSON.stringify(['hsv', hsv]));
      }
    }
  };
};
