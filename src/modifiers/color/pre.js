'use strict';

const pre = function(leds, init) {
  const scope = init.scope;
  const date = new Date();

  scope.beat = scope.b = leds.beat;
  scope.random = scope.r = [Math.random(), Math.random(), Math.random(), Math.random()];
  scope.time = scope.t = date.getTime();
  scope.year = scope.yr = date.getFullYear();
  scope.month = scope.mo = date.getMonth() + 1;
  scope.date = scope.d = date.getDate();
  scope.day = date.getDay();
  scope.hour = scope.hr = date.getHours();
  scope.minute = scope.m = date.getMinutes();
  scope.second = scope.s = date.getSeconds();
  scope.millisecond = scope.ms = date.getMilliseconds()

  return scope;
};

module.exports = pre;
