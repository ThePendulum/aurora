'use strict';

const note = require('note-log');
const util = require('util');

const hsv2rgb = require('../../utils/hsv2rgb.js');

const each = function(pixel, leds, pre, init) {
  const scope = pre;

  scope.index = scope.i = pixel.index;
  scope.x = pixel.x;
  scope.y = pixel.y;
  scope.pixelRandom = scope.pr = Math.random();
  scope.previous = scope.p = pixel.values;

  if(leds.mode === 'hsv') {
    let hue, saturation, value;

    try {
      hue = init.hsv.hue.eval(scope);
      saturation = init.hsv.saturation.eval(scope);
      value = init.hsv.value.eval(scope)

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
      note('color', 2, error.message);
    }

    return hsv2rgb(hue, saturation, value);
  }

  if(leds.mode === 'rgb') {
    let r, g, b;

    try {
      r = Math.max(0, Math.min(255, init.rgb.red.eval(scope)));
      g = Math.max(0, Math.min(255, init.rgb.green.eval(scope)));
      b = Math.max(0, Math.min(255, init.rgb.blue.eval(scope)));
    } catch(error) {
      note(error);
    }

    return [r, g, b];
  }

  return pixel.values;
};

module.exports = each;
