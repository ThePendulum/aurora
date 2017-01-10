'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (req, res) {
    return (0, _login2.default)(req.body.username, req.body.password).then(function (results) {
        req.session.authenticated = true;

        res.redirect('/');
    }).catch(function (error) {
        res.redirect('/login');
    });
};

var _noteLog = require('note-log');

var _noteLog2 = _interopRequireDefault(_noteLog);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _login = require('../auth/login.js');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;