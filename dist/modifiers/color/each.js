'use strict';

var note = require('note-log');
var util = require('util');

var hsv2rgb = require('../../utils/hsv2rgb.js');

var each = function each(pixel, leds, pre, init) {
  var scope = pre;

  scope.index = scope.i = pixel.index;
  scope.x = pixel.x;
  scope.y = pixel.y;
  scope.pixelRandom = scope.pr = Math.random();

  if (leds.mode === 'hsv') {
    var hue = void 0,
        saturation = void 0,
        value = void 0;

    try {
      hue = init.hsv.hue.eval(scope);
      saturation = init.hsv.saturation.eval(scope);
      value = init.hsv.value.eval(scope);

      // Use default when empty. Use first of multiple results
      if (typeof hue === 'undefined') {
        hue = 0;
      } else if (hue.entries) {
        hue = hue.entries[0];
      }

      if (typeof saturation === 'undefined') {
        saturation = 0;
      } else if (saturation.entries) {
        saturation = saturation.entries[0];
      }

      if (typeof value === 'undefined') {
        value = 0;
      } else if (value.entries) {
        value = value.entries[0];
      }
    } catch (error) {
      note('color', 2, error.message);
    }

    return hsv2rgb(hue, saturation, value);
  }

  if (leds.mode === 'rgb') {
    var r = void 0,
        g = void 0,
        b = void 0;

    try {
      r = Math.max(0, Math.min(255, init.rgb.red.eval(scope)));
      g = Math.max(0, Math.min(255, init.rgb.green.eval(scope)));
      b = Math.max(0, Math.min(255, init.rgb.blue.eval(scope)));
    } catch (error) {
      note(error);
    }

    return [r, g, b];
  }

  return pixel.values;
};

module.exports = each;