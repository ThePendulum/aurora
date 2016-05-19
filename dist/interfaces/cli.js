'use strict';

module.exports = function (server, stream) {
    return {
        off: function off(leds) {
            leds.pixels = leds.pixels.map(function () {
                return [0, 0, 0];
            });
        }
    };
};