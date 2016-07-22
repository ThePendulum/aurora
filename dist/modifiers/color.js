'use strict';

var config = require('config');
var note = require('note-log');
var util = require('util');
var math = require('mathjs');
var hsv2rgb = require('../utils/hsv2rgb.js');

var init = function init(leds, ws) {
  var rgb = {
    red: {
      value: 255,
      eval: function _eval() {
        return 255;
      }
    },
    green: {
      value: 0,
      eval: function _eval() {
        return 0;
      }
    },
    blue: {
      value: 0,
      eval: function _eval() {
        return 0;
      }
    }
  };

  var hsv = {
    hue: {
      value: 0,
      eval: function _eval() {
        return 0;
      }
    },
    saturation: {
      value: 1,
      eval: function _eval() {
        return 1;
      }
    },
    value: {
      value: 1,
      eval: function _eval() {
        return 1;
      }
    }
  };

  ws.on('connection', function (wss) {
    wss.transfer('rgb', { red: rgb.red.value, green: rgb.green.value, blue: rgb.blue.value });
    wss.transfer('hsv', { hue: hsv.hue.value, saturation: hsv.saturation.value, value: hsv.value.value });

    wss.on('message', function (msg) {
      var data = JSON.parse(msg);

      if (data[0] === 'rgb') {
        try {
          Object.keys(data[1]).forEach(function (prop) {
            rgb[prop] = {
              value: data[1][prop],
              eval: math.compile(data[1][prop]).eval
            };
          });

          wss.broadcast('rgb', data[1]);
        } catch (error) {
          wss.transfer('error', error.message);
        }
      }

      if (data[0] === 'hsv') {
        try {
          Object.keys(data[1]).forEach(function (prop) {
            hsv[prop] = {
              value: data[1][prop],
              eval: math.compile(data[1][prop]).eval
            };
          });

          wss.broadcast('hsv', data[1]);
        } catch (error) {
          wss.transfer('error', error.message);
        }
      }
    });
  });

  var scope = {};

  scope.length = scope.l = leds.pixels.length;
  scope.width = scope.w = config.size[0] || config.size;
  scope.height = scope.h = config.size[1] || 1;

  return { rgb: rgb, hsv: hsv, scope: scope };
};

var pre = function pre(leds, init) {
  var scope = init.scope;
  var date = new Date();

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
  scope.millisecond = scope.ms = date.getMilliseconds();

  return scope;
};

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

module.exports = { init: init, pre: pre, each: each };