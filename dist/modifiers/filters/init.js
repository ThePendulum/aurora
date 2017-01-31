'use strict';

var init = function init(leds, socket) {
    var filters = {
        smoothing: .5
    };

    socket.init('smoothing', function () {
        return filters.smoothing;
    });

    socket.listen('smoothing', function (smoothing) {
        filters.smoothing = smoothing;
    });

    return { filters: filters };
};

module.exports = init;