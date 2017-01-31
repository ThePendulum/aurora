'use strict';

const init = function(leds, socket) {
    const filters = {
        smoothing: 0
    };

    socket.init('smoothing', () => {
        return filters.smoothing;
    });

    socket.listen('smoothing', smoothing => {
        filters.smoothing = smoothing;
    });

    return {filters};
};

module.exports = init;
