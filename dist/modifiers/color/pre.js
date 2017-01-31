'use strict';

var pre = function pre(leds, init) {
    var scope = init.scope;
    var date = new Date();

    scope.beat = scope.b = leds.beat;
    scope.random1 = scope.r1 = Math.random();
    scope.random2 = scope.r2 = Math.random();
    scope.time = scope.t = date.getTime();
    scope.year = scope.yr = date.getFullYear();
    scope.month = scope.mo = date.getMonth() + 1;
    scope.date = scope.d = date.getDate();
    scope.day = date.getDay();
    scope.hour = scope.hr = date.getHours();
    scope.minute = scope.m = date.getMinutes();
    scope.second = scope.s = date.getSeconds();
    scope.millisecond = scope.ms = date.getMilliseconds();

    return scope;
};

module.exports = pre;