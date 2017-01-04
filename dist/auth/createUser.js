'use strict';

var note = require('note-log');
var knex = require('../knex.js');

module.exports = function (username, password) {
    var type = arguments.length <= 2 || arguments[2] === undefined ? 'user' : arguments[2];

    if (!username) {
        throw new Error('Please supply a username.');
    }

    if (!password) {
        throw new Error('Please supply a password.');
    }

    if (!type) {
        note('user', 1, 'No user type supplied, using \'user\'.');
    }

    return knex('users').insert({
        username: username,
        password: password,
        type: type
    });
};