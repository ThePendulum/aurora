'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (username, password) {
    if (!username || !password) {
        throw new Error('Incorrect credentials.');
    }

    return (0, _knex2.default)('users').where({
        username: username
    }).first().then(function (user) {
        if (!user) {
            throw new Error('Incorrect credentials.');
        }

        return _scryptForHumans2.default.verifyHash(password, user.password).then(function (hash) {
            return { user: user, hash: hash };
        });
    }).then(function (_ref) {
        var user = _ref.user,
            hash = _ref.hash;

        return {
            id: user.id,
            username: user.username,
            role: user.role
        };
    });
};

var _noteLog = require('note-log');

var _noteLog2 = _interopRequireDefault(_noteLog);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _knex = require('../knex.js');

var _knex2 = _interopRequireDefault(_knex);

var _scryptForHumans = require('scrypt-for-humans');

var _scryptForHumans2 = _interopRequireDefault(_scryptForHumans);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;