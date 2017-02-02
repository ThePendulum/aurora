'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');

var methods = ['ws2801', 'ws281x'].reduce(function (acc, name) {
    try {
        acc[name] = require('./' + name);
    } catch (error) {
        note('render', 1, 'Default render module \'' + name + '\' is not supported on this system');
    }

    return acc;
}, {});

Object.assign(methods, config.render);

module.exports = function (leds) {
    if (methods[leds.chip]) {
        return methods[leds.chip];
    }

    throw new Error('Chip has no render module');
};