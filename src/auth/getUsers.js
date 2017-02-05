'use strict';

const note = require('note-log');

const knex = require('../knex.js');

module.exports = function(query) {
    return knex('users').where(query || {}).select('username', 'role');
};
