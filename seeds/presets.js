'use strict';

exports.seed = function(knex, Promise) {
    return knex('presets').where({
        user: 'aurora'
    }).delete().then(() => {
        return knex('presets').insert([{
            name: 'White',
            targets: JSON.stringify(['master', 'hex']),
            values: JSON.stringify({
                hex: '#ffffff'
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Warm White',
            targets: JSON.stringify(['master', 'hex']),
            values: JSON.stringify({
                hex: '#ffbf80'
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Color Cycle',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: 'b',
                saturation: 1,
                value: 1
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Flowing Rainbow',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: 'i + b',
                saturation: 1,
                value: 1
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Rainbow Master',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: 'i * (1 + 2 * my) + 360 * mx',
                saturation: 1,
                value: 1
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d', 'modulation'])
        }, {
            name: 'Spectrum',
            targets: JSON.stringify(['master', 'hue']),
            values: JSON.stringify({
                hue: '60 * i',
                saturation: 1,
                value: 1
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d'])
        }, {
            name: 'Full',
            targets: JSON.stringify(['saturation']),
            values: JSON.stringify({
                saturation: 1
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Full',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                value: 1
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Chase',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 30,
                saturation: .4,
                value: 'sin(i + b)'
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Strobe',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 0,
                value: 'b % 2'
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Y Modulation',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                value: 'my'
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Pulse',
            targets: JSON.stringify(['value']),
            values: JSON.stringify({
                value: '.5 + .5 * sin(.1 * b)'
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Alert',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 1,
                value: 'sin(.3 * b)',
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }, {
            name: 'Lightning',
            targets: JSON.stringify(['master', 'value']),
            values: JSON.stringify({
                hue: 0,
                saturation: 0,
                value: 'sin(.05 * b) * r[1] * (.5 + .5 * sin(.05 * i * r[2]))'
            }),
            user: 'aurora',
            tags: JSON.stringify(['1d', '2d'])
        }]);
    });
};
