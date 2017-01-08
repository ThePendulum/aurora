'use strict';

var note = require('note-log');
var util = require('util');
var login = require('../auth/login.js');

module.exports = function (req, res) {
    return login(req.body.username, req.body.password).then(function (results) {
        req.session.authenticated = true;

        res.send(results);
    });
};