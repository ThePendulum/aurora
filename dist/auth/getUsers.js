'use strict';

var note = require('note-log');

var knex = require('../knex.js');

module.exports = function (query) {
    return knex('users').where(query || {}).select('username', 'role');
};