'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const heart = function(leds, ws) {
  const modifiers = require('./modifiers/modifiers.js')(leds);

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

    const postResults = modifiers.map((modifier, index) => {
      if(modifier.post) {
        return modifier.post(leds, preResults[index], initResults[index]);
      }
    });

    leds.beat += 1;

    setTimeout(function() {
      beat();
    }, leds.interval);
  };

  beat();
};

module.exports = heart;
