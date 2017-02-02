'use strict';

module.exports = function (gamma) {
    return Array.from({ length: 256 }, function (value, index) {
        return Math.round(Math.pow(index / 255, 1 / gamma) * 255);
    });
};