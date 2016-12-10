'use strict';

var config = require('config');
var note = require('note-log');
var Knex = require('knex');

var knex = Knex(config.database);

knex.schema.dropTable('presets').then(function () {
    return knex.schema.createTable('presets', function (table) {
        table.increments(), table.string('name'), table.string('target'), table.text('value');
    });
}).then(function () {
    return knex('presets').insert([{
        name: 'Color Fade',
        target: 'hue',
        value: 'b'
    }, {
        name: 'Flowing Rainbow',
        target: 'hue',
        value: 'i + b'
    }, {
        name: 'Spectrum',
        target: 'hue',
        value: '60i'
    }, {
        name: 'Chase',
        target: 'value',
        value: 'sin(i + b)'
    }, {
        name: 'Fade',
        target: 'value',
        value: '.5 + .5sin(.1b)'
    }, {
        name: 'Strobe',
        target: 'value',
        value: 'b % 2'
    }]);
}).catch(function (error) {
    note('create', error);
});

module.exports = knex;