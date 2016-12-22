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
        table.text('value'),
        table.text('labels')
    });
}).then(() => {
    return knex('presets').insert([{
        name: 'Cold White',
        target: 'hex',
        value: '#ffffff',
        labels: '1d,2d'
    }, {
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
        name: 'Strobe',
        target: 'value',
        value: 'b % 2',
        labels: '1d,2d'
    }, {
        name: 'Fade',
        target: 'value',
        value: '.5 + .5sin(.1b)',
        labels: '1d,2d'
    }, {
        name: 'Alert',
        target: 'value',
        value: 'sin(.3b)',
        labels: '1d,2d'
    }, {
        name: 'Lightning',
        target: 'value',
        value: 'sin(.05b) * r[1] * (.5 + .5sin(.05i * r[2]))'
    }]);
}).catch(error => {
    note('create', error);
});

module.exports = knex;
