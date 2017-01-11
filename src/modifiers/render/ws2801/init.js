'use strict';

const config = require('config');
const SPI = require('spi');

const address = (config.spi ? config.spi.address : null) || '/dev/spidev0.0';
const mode = (config.spi ? config.spi.mode : null) || 'MODE_0';

const init = function() {
    return {
        render: new SPI.Spi(address, {
            mode: SPI.MODE[mode],
            chipSelect: SPI.CS['none']
        }, function(s) {
            s.open();
        }),
        buffer: Array.from({length: leds.pixels.length * 3})
    }
};

module.exports = init;
