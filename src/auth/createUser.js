'use strict';

const note = require('note-log');
const knex = require('../knex.js');

module.exports = function(username, password, type = 'user') {
    if(!username) {
        throw new Error('Please supply a username.');
    }

    if(!password) {
        throw new Error('Please supply a password.');
    }

    if(!type) {
        note('user', 1, 'No user type supplied, using \'user\'.');
    }

    return knex('users').insert({
        username,
        password,
        type
    });
};
