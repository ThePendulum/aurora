'use strict';

const Immutable = require('immutable');

const state = Immutable.Map({
  canvas: Immutable.Map({
    width: 0,
    height: 0,
    regulator: 1,
    pixels: Immutable.List()
  }),
  color: Immutable.Map({
    rgb: Immutable.Map({
      red: 255,
      green: 0,
      blue: 0
    }),
    hsv: Immutable.Map({
      hue: 0,
      saturation: 1,
      value: 1
    }),
    sync: true
  }),
  draw: Immutable.Map({
    pencil: Immutable.Map({
      color: [0, 0, 0],
      opacity: 1
    })
  })
});

module.exports = state;
