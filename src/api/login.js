'use strict';

const note = require('note-log');
const util = require('util');
const login = require('../auth/login.js');

module.exports = function(req, res) {
    return login(req.body.username, req.body.password).then(results => {
        req.session.authenticated = true;

        res.send(results);
    });
};
