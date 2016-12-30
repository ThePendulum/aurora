'use strict';

const config = require('config');
const Knex = require('knex');

module.exports = Knex(config.database);
