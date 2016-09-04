'use strict';

var config = require('config');
var note = require('note-log');
var express = require('express');
var path = require('path');

module.exports = function (leds) {
    var app = express();

    app.use(express.static('public'));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    });

    app.listen(config.get('web.port'), function () {
        note('server', 'Web server listening on port ' + config.get('web.port'));
    });
};