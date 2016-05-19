'use strict';

var config = require('config');
var note = require('note-log');
var express = require('express');
var exphbs = require('express-handlebars');

module.exports = function (leds) {
    var app = express();

    app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));

    app.set('view engine', 'handlebars');

    app.use(express.static('public'));

    app.get('/', function (req, res) {
        res.render('home', {
            title: 'Home',
            leds: leds
        });
    });

    app.listen(config.get('web.port'), function () {
        note('server', 'Web server listening on port ' + config.get('web.port'));
    });
};