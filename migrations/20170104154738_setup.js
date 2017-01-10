'use strict';

const scrypt = require('scrypt-for-humans');

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', table => {
            table.increments(),
            table.string('username').unique(),
            table.string('password'),
            table.string('role', ['admin', 'guest', 'user'])
        }).then(() => {
            return Promise.all([
                knex('users').where({
                    username: 'aurora'
                }).delete(),
                scrypt.hash('aurora')
            ]).then(results => {
                return knex('users').insert({
                    username: 'aurora',
                    password: results[1],
                    role: 'admin'
                });
            });
        }),
        knex.schema.createTableIfNotExists('presets', table => {
            table.increments(),
            table.string('name'),
            table.text('targets'),
            table.text('values'),
            table.text('tags'),
            table.string('user')
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('presets')
    ]);
};
