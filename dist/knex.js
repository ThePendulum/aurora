'use strict';

var config = require('config');
var note = require('note-log');
var Knex = require('knex');

var knex = Knex(config.database);

knex.schema.dropTable('presets').then(function () {
    return knex.schema.createTable('presets', function (table) {
        table.increments(), table.string('name'), table.string('target'), table.text('value'), table.text('labels');
    });
}).then(function () {
    return knex('presets').insert([{
        name: 'Warm White',
        target: 'hex',
        value: '#ffcc99',
        labels: '1d,2d'
    }, {
        name: 'Color Fade',
        target: 'hue',
        value: 'b',
        labels: '1d,2d'
    }, {
        name: 'Flowing Rainbow',
        target: 'hue',
        value: 'i + b',
        labels: '1d,2d'
    }, {
        name: 'Spectrum',
        target: 'hue',
        value: '60i',
        labels: '1d'
    }, {
        name: 'Chase',
        target: 'value',
        value: 'sin(i + b)',
        labels: '1d,2d'
    }, {
        name: 'Fade',
        target: 'value',
        value: '.5 + .5sin(.1b)',
        labels: '1d,2d'
    }, {
        name: 'Strobe',
        target: 'value',
        value: 'b % 2',
        labels: '1d,2d'
    }, {
        name: 'Lightning',
        target: 'value',
        value: 'sin(.1b) * r[1]'
    }]);
}).catch(function (error) {
    note('create', error);
});

module.exports = knex;