'use strict';

var config = require('config');
var SPI = require('spi');

var address = (config.spi ? config.spi.address : null) || '/dev/spidev0.0';
var mode = (config.spi ? config.spi.mode : null) || 'MODE_0';

var init = function init() {
  return new SPI.Spi(address, {
    mode: SPI.MODE[mode],
    chipSelect: SPI.CS['none']
  }, function (s) {
    s.open();
  });
};

module.exports = init;