'use strict';

var _noteLog = require('note-log');

var _noteLog2 = _interopRequireDefault(_noteLog);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _knex = require('../knex.js');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (username, password) {
    if (!username || !password) {
        throw new Error('Incorrect credentials.');
    }

    return (0, _knex2.default)('users').where({
        username: username
    }).first().then(function (user) {
        return scrypt.verifyHash(password, user.password);
    }).then(function () {
        return {
            id: user.id,
            username: user.username,
            type: user.type
        };
    });
};