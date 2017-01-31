'use strict';

const init = function(leds, socket) {
    const filters = {
        smoothing: 0
    };

    socket.init('smoothing', () => {
        return filters.smoothing;
    });

    socket.listen('smoothing', smoothing => {
        filters.smoothing = Math.max(0, Math.min(.99, Number(smoothing)));
    });

    return {filters};
};

module.exports = init;
