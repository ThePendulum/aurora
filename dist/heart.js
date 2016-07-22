'use strict';

var config = require('config');

var note = require('note-log');
var util = require('util');
var render = require('./render.js');
var modifiers = require('./modifiers.js');

var heart = function heart(leds, ws) {
  var initResults = modifiers.map(function (modifier) {
    if (modifier.init) {
      return modifier.init(leds, ws);
    }
  });

  var beat = function beat() {
    var preResults = modifiers.map(function (modifier, index) {
      if (modifier.pre) {
        return modifier.pre(leds, initResults[index]);
      }
    });

    leds.pixels = leds.pixels.map(function (pixel) {
      pixel.values = modifiers.reduce(function (values, modifier, index) {
        if (modifier.each) {
          return modifier.each(Object.assign(pixel, { values: values }), leds, preResults[index], initResults[index]);
        }

        return values;
      }, pixel.values);

      return pixel;
    });

    leds.beat += 1;

    setTimeout(function () {
      beat();
    }, leds.interval);

    render(leds);
  };

  beat();

  if (config.persist === false) {
    var shutdown = function shutdown() {
      leds.pixels = leds.pixels.map(function (pixel) {
        pixel.values = [0, 0, 0];

        return pixel;
      });

      render(leds);
      process.exit();
    };

    process.on('SIGINT', shutdown);
    process.on('exit', shutdown);
  }
};

module.exports = heart;