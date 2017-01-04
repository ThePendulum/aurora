'use strict';

exports.seed = function(knex, Promise) {
    return knex('presets').where({
        factory: true
    }).delete().then(() => {
        return knex('presets').insert([{
            name: 'White',
            targets: JSON.stringify(['master', 'hex']),
            values: JSON.stringify({
                hex: '#ffffff'
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Warm White',
            targets: JSON.stringify(['master', 'hex']),
            values: JSON.stringify({
                hex: '#ffcc99'
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Color Fade',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: 'b',
                saturation: 1,
                value: 1
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Flowing Rainbow',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: 'i + b',
                saturation: 1,
                value: 1
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Spectrum',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: '60i',
                saturation: 1,
                value: 1
            }),
            factory: true,
            tags: JSON.stringify(['1d'])
        }, {
            name: 'Full',
            targets: JSON.stringify(['saturation']),
            values: JSON.stringify({
                saturation: 1
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Full',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                value: 1
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Chase',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 30,
                saturation: .4,
                value: 'sin(i + b)'
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Strobe',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 0,
                value: 'b % 2'
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Fade',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                value: '.5 + .5sin(.1b)'
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Alert',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 1,
                value: 'sin(.3b)',
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Lightning',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 0,
                value: 'sin(.05b) * r[1] * (.5 + .5sin(.05i * r[2]))'
            }),
            factory: true,
            tags: JSON.stringify(['1d', '2d'])
        }]);
    });
};
