'use strict';

const config = require('config');

const note = require('note-log');
const util = require('util');
const render = require('./render.js');
const modifiers = require('./modifiers.js');

const heart = function(leds, ws) {
  const initResults = modifiers.map(modifier => {
    if(modifier.init) {
      return modifier.init(leds, ws);
    }
  });

  const beat = function() {
    const preResults = modifiers.map((modifier, index) => {
      if(modifier.pre) {
        return modifier.pre(leds, initResults[index]);
      }
    });

    leds.pixels = leds.pixels.map(pixel => {
      pixel.values = modifiers.reduce((values, modifier, index) => {
        if(modifier.each) {
          return modifier.each(Object.assign(pixel, {values}), leds, preResults[index], initResults[index]);
        }

        return values;
      }, pixel.values);

      return pixel;
    });

    leds.beat += 1;

    setTimeout(function() {
      beat();
    }, leds.interval);

    render(leds);
  }

  beat();

  if(config.persist === false) {
    const shutdown = function() {
      leds.pixels = leds.pixels.map(pixel => {
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
