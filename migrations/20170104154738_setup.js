'use strict';

const scrypt = require('scrypt-for-humans');
const passwordGenerator = require('generate-password');

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', table => {
            table.increments(),
            table.string('username').unique(),
            table.string('password'),
            table.string('role')
        }).then(() => {
            const rootPassword = passwordGenerator.generate({
                length: 32,
                numbers: true,
                symbols: true,
                uppercase: true
            });

            return Promise.all([
                knex('users').whereIn('username', ['aurora', 'guest']).delete(),
                scrypt.hash(rootPassword)
            ]).then(results => {
                return knex('users').insert([{
                    username: 'aurora',
                    password: results[1],
                    role: 'root'
                }, {
                    username: 'guest',
                    password: 'guest',
                    role: 'guest'
                }]);
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
