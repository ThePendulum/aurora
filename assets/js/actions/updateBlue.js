'use strict';

const rgbToHsv = require('../rgbToHsv.js');

module.exports = function(blue, socket) {
  return function(dispatch, getState) {
    const color = getState().get('color');
    const rgb = color.get('rgb').toObject();
    const hsv = rgbToHsv(rgb.red, rgb.green, blue).hsv;
    const sync = color.get('sync');

    dispatch({
      type: 'UPDATE_BLUE',
      data: blue
    });

    if(socket) {
      socket.send(JSON.stringify(['mode', 'rgb']));
      socket.send(JSON.stringify(['rgb', {...rgb, blue}]));
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
