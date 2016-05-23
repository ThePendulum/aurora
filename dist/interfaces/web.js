'use strict';

var config = require('config');
var note = require('note-log');
var express = require('express');
var exphbs = require('express-handlebars');

module.exports = function (leds) {
    var app = express();

    app.use(express.static('public'));

    app.listen(config.get('web.port'), function () {
        note('server', 'Web server listening on port ' + config.get('web.port'));
    });
};