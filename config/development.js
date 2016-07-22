'use strict';

module.exports = {
  chip: 'ws2801',
  size: 50,
  colorIndex: [0, 2, 1],
  regulator: 1,
  persist: false,
  web: {
    port: 3000
  },
  socket: {
    port: 3001,
    previewUpdateInterval: 200
  }
};
