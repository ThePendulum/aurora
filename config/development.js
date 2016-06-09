'use strict';

module.exports = {
  chip: 'ws2812b',
  size: [16, 16],
  zigzag: true,
  colorIndex: [0, 1, 2],
  regulator: .3,
  web: {
    port: 3000
  },
  socket: {
    port: 3001,
    previewUpdateInterval: 200
  }
};
