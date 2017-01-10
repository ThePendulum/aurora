'use strict';

const note = require('note-log');
const scrypt = require('scrypt-for-humans');

const knex = require('../knex.js');

module.exports = function(username, password, role) {
    if(!username) {
        throw new Error('Please supply a username.');
    }

    if(!password) {
        throw new Error('Please supply a password.');
    }

    if(!role) {
        role = 'user';

        note('user', 1, 'No user role supplied, using \'user\'.');
    }

    return Promise.resolve().then(() => {
        return knex('users').where({
            username
        }).delete();
    }).then(() => {
        return scrypt.hash(password);
    }).then(hash => {
        return knex('users').insert({
            username,
            password: hash,
            role
        });
    });
};
