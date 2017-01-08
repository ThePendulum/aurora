'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var config = require('config');
var util = require('util');
var note = require('note-log');
var express = require('express');
var Router = require('express-promise-router');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var uuid = require('uuid');

var port = config.has('web.port') ? config.web.port : 3000;

var errorHandler = require('./api/error.js');
var login = require('./api/login.js');

module.exports = function (leds) {
    var app = express();
    var router = Router();

    router.use(bodyParser.json());
    router.use(express.static('public'));

    app.use(session(_extends({
        genid: uuid
    }, config.session)));

    app.use(router);
    app.use(errorHandler);

    router.post('/api/login', login);

    router.get('*', function (req, res) {
        note(util.inspect(req.session));

        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.listen(port, function () {
        note('server', 'Web server listening on port ' + port);
    });
};