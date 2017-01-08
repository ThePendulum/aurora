'use strict';

import note from 'note-log';
import util from 'util';
import knex from '../knex.js';

module.exports = function(username, password) {
    if(!username || !password) {
        throw new Error('Incorrect credentials.');
    }

    return knex('users').where({
        username
    }).first().then(user => {
        return scrypt.verifyHash(password, user.password);
    }).then(() => {
        return {
            id: user.id,
            username: user.username,
            type: user.type
        };
    });
};
