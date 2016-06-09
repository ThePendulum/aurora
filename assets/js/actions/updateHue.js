'use strict';

const hsvToRgb = require('../hsvToRgb.js');

module.exports = function(hue, socket) {
  return function(dispatch, getState) {
    const color = getState().get('color');
    const hsv = color.get('hsv').toObject();
    const rgb = hsvToRgb(hue, hsv.saturation, hsv.value).rgb;
    const sync = color.get('sync');

    dispatch({
      type: 'UPDATE_HUE',
      data: hue
    });

    if(socket) {
      socket.send(JSON.stringify(['mode', 'hsv']));
      socket.send(JSON.stringify(['hsv', {...hsv, hue}]));
    }

    if(sync) {
      dispatch({
        type: 'UPDATE_RED',
        data: rgb.red
      });

      dispatch({
        type: 'UPDATE_GREEN',
        data: rgb.green
      });

      dispatch({
        type: 'UPDATE_BLUE',
        data: rgb.blue
      });

      if(socket) {
        socket.send(JSON.stringify(['rgb', rgb]));
      }
    }
  };
};
