'use strict';

var note = require('note-log');

module.exports = function (error, req, res, next) {
    note('api', error);

    res.status(error.httpStatus || 500).send(error.message);

    next();
};