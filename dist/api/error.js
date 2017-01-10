'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (error, req, res, next) {
    (0, _noteLog2.default)('api', error);

    res.status(error.httpStatus || 500).send(error.message);

    next();
};

var _noteLog = require('note-log');

var _noteLog2 = _interopRequireDefault(_noteLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;