'use strict';

var init = function init(leds, socket) {
    var filters = {
        smoothing: 0
    };

    socket.init('smoothing', function () {
        return filters.smoothing;
    });

    socket.listen('smoothing', function (smoothing) {
        filters.smoothing = Math.max(0, Math.min(.99, Number(smoothing)));
    });

    return { filters: filters };
};

module.exports = init;