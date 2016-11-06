'use strict';

const config = require('config');
const SPI = require('spi');

const address = (config.spi ? config.spi.address : null) || '/dev/spidev0.0';
const mode = (config.spi ? config.spi.mode : null) || 'MODE_0';

const init = function() {
  return new SPI.Spi(address, {
    mode: SPI.MODE[mode],
    chipSelect: SPI.CS['none']
  }, function(s) {
    s.open();
  });
};

module.exports = init;
