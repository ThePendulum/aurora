'use strict';

var config = require('config');
var Knex = require('knex');

module.exports = Knex(config.database);