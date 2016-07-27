'use strict';

const ws2801 = {
  chip: 'ws2801',
  size: 50,
  colorIndex: [0, 2, 1],
  regulator: 1,
  persist: true,
  web: {
    port: 3000
  },
  socket: {
    port: 3001,
    previewUpdateInterval: 200
  }
};

const ws2812b = {
  chip: 'usb',
  size: 256,
  colorIndex: [0, 1, 2],
  regulator: .5,
  persist: false,
  usb: {
    path: '/dev/ttyACM0',
    baudRate: 9600
  },
  web: {
    port: 3000
  },
  socket: {
    port: 3001,
    previewUpdateInterval: 200
  }
};

module.exports = ws2801;
