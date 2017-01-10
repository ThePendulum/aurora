'use strict';

import note from 'note-log';
import util from 'util';
import knex from '../knex.js';
import scrypt from 'scrypt-for-humans';

export default function(username, password) {
    if(!username || !password) {
        throw new Error('Incorrect credentials.');
    }

    return knex('users').where({
        username
    }).first().then(user => {
        if(!user) {
            throw new Error('Incorrect credentials.');
        }

        return scrypt.verifyHash(password, user.password).then(hash => {
            return {user, hash};
        });
    }).then(({user, hash}) => {
        return {
            id: user.id,
            username: user.username,
            role: user.role
        };
    });
};
