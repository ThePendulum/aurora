'use strict';

module.exports = function(server, stream) {
    return {
        off: function(leds) {
            leds.pixels = leds.pixels.map(() => { return [0, 0, 0]; });
        }
    };
};
