'use strict';

const knex = require('../knex.js');

module.exports = function(query) {
    return knex('presets').then(presets => {
        return presets.map(preset => {
            preset.targets = JSON.parse(preset.targets);
            preset.values = JSON.parse(preset.values);
            preset.tags = JSON.parse(preset.tags);

            return preset;
        });
    });
};
