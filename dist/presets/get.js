'use strict';

var knex = require('../knex.js');

module.exports = function (query) {
    return knex('presets').then(function (presets) {
        return presets.map(function (preset) {
            preset.targets = JSON.parse(preset.targets);
            preset.values = JSON.parse(preset.values);
            preset.tags = JSON.parse(preset.tags);

            return preset;
        });
    });
};