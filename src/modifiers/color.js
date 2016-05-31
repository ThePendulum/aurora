'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');
const math = require('mathjs');
const hsv2rgb = require('../utils/hsv2rgb.js');

const init = function(leds) {
  const scope = {};

  scope.length = scope.l = leds.pixels.length;
  scope.width = scope.w = config.size[0] || config.size;
  scope.height = scope.h = config.size[1] || 1;

  return scope;
};

const pre = function(leds, init) {
  const scope = init;
  const date = new Date();

  scope.beat = scope.b = leds.beat;
  scope.random = scope.r = [Math.random(), Math.random(), Math.random(), Math.random()];
  scope.time = scope.t = date;
  scope.year = scope.yr = date.getFullYear();
  scope.month = scope.mo = date.getMonth();
  scope.date = scope.d = date.getDate();
  scope.hour = scope.hr = date.getHours();
  scope.minute = scope.m = date.getMinutes();
  scope.second = scope.s = date.getSeconds();
  scope.millisecond = scope.ms = date.getMilliseconds()

  return scope;
};

const each = function(pixel, leds, pre, init) {
  const scope = pre;

  scope.index = scope.i = pixel.index;
  scope.x = pixel.x;
  scope.y = pixel.y;

  if(leds.mode === 'hsv') {
    let hue, saturation, value;

    try {
      hue = leds.hsv.hue.eval(scope);
      saturation = leds.hsv.saturation.eval(scope);
      value = leds.hsv.value.eval(scope)

      // Use default when empty. Use first of multiple results
      if(typeof hue === 'undefined') {
        hue = 0;
      } else if(hue.entries) {
        hue = hue.entries[0];
      }

      if(typeof saturation === 'undefined') {
        saturation = 0;
      } else if(saturation.entries) {
        saturation = saturation.entries[0];
      }

      if(typeof value === 'undefined') {
        value = 0;
      } else if(value.entries) {
        value = value.entries[0];
      }
    } catch(error) {
      note('pattern', 2, error.message);
    }

    return hsv2rgb(hue, saturation, value);
  }

  if(leds.mode === 'rgb') {
    let r, g, b;

    try {
      r = Math.max(0, Math.min(255, leds.rgb.red.eval(scope)));
      g = Math.max(0, Math.min(255, leds.rgb.green.eval(scope)));
      b = Math.max(0, Math.min(255, leds.rgb.blue.eval(scope)));
    } catch(error) {
      note(error);
    }

    return [r, g, b];
  }
};

module.exports = {init, pre, each};
