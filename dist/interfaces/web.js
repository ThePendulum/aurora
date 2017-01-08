'use strict';

var _login = require('../api/login.js');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('config');
var util = require('util');
var note = require('note-log');
var express = require('express');
var session = require('express-session');
var path = require('path');

var port = config.has('web.port') ? config.web.port : 3000;

module.exports = function (leds) {
    var app = express();

    app.use(express.static('public'));

    app.get('/api/login', _login2.default);

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    });

    app.listen(port, function () {
        note('server', 'Web server listening on port ' + port);
    });
};