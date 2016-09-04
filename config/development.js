'use strict';

module.exports = {
  chip: 'ws2812b',
  size: [16, 16],
  colorIndex: [0, 1, 2],
  zigzag: true,
  regulator: .5,
  persist: false,
  web: {
    port: 3000
  },
  socket: {
    port: 3001,
    previewUpdateInterval: 200
  }
};
