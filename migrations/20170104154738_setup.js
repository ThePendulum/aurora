'use strict';

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', table => {
            table.increments(),
            table.string('username').unique(),
            table.string('password'),
            table.string('type', ['admin', 'guest', 'user'])
        }),
        knex.schema.createTableIfNotExists('presets', table => {
            table.increments(),
            table.string('name'),
            table.text('targets'),
            table.text('values'),
            table.integer('factory'),
            table.text('tags')
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('presets')
    ]);
};
