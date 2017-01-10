'use strict';

var note = require('note-log');
var scrypt = require('scrypt-for-humans');

var knex = require('../knex.js');

module.exports = function (username, password, role) {
    if (!username) {
        throw new Error('Please supply a username.');
    }

    if (!password) {
        throw new Error('Please supply a password.');
    }

    if (!role) {
        role = 'user';

        note('user', 1, 'No user role supplied, using \'user\'.');
    }

    return Promise.resolve().then(function () {
        return knex('users').where({
            username: username
        }).delete();
    }).then(function () {
        return scrypt.hash(password);
    }).then(function (hash) {
        return knex('users').insert({
            username: username,
            password: hash,
            role: role
        });
    });
};