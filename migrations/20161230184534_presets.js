'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('presets', table => {
        table.increments(),
        table.string('name'),
        table.text('targets'),
        table.text('values'),
        table.text('labels')
    }).then(() => {
        return knex('presets').insert([{
            name: 'Cold White',
            targets: JSON.stringify(['master', 'hex']),
            values: JSON.stringify({
                hex: '#ffffff'
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Warm White',
            targets: JSON.stringify(['master', 'hex']),
            values: JSON.stringify({
                hex: '#ffcc99'
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Color Fade',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: 'b',
                saturation: 1,
                value: 1
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Flowing Rainbow',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: 'i + b',
                saturation: 1,
                value: 1
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Spectrum',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: '60i',
                saturation: 1,
                value: 1
            }),
            labels: JSON.stringify(['factory', '1d'])
        }, {
            name: 'Full',
            targets: JSON.stringify(['saturation']),
            values: JSON.stringify({
                saturation: 1
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Full',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                value: 1
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Chase',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 30,
                saturation: .4,
                value: 'sin(i + b)'
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Strobe',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 0,
                value: 'b % 2'
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Fade',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                value: '.5 + .5sin(.1b)'
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Alert',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 1,
                value: 'sin(.3b)',
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }, {
            name: 'Lightning',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 0,
                value: 'sin(.05b) * r[1] * (.5 + .5sin(.05i * r[2]))'
            }),
            labels: JSON.stringify(['factory', '1d', '2d'])
        }]);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('presets');
};
