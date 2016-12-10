'use strict';

const config = require('config');
const note = require('note-log');
const Knex = require('knex');

const knex = Knex(config.database);

knex.schema.dropTable('presets').then(() => {
    return knex.schema.createTable('presets', table => {
        table.increments(),
        table.string('name'),
        table.string('target'),
        table.text('value')
    });
}).then(() => {
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
}).catch(error => {
    note('create', error);
});

module.exports = knex;
