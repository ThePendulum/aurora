'use strict';

const config = require('config');
const note = require('note-log');
const express = require('express');
const exphbs = require('express-handlebars');

module.exports = function(leds) {
    const app = express();

    app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));

    app.set('view engine', 'handlebars');

    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.render('home', {
            title: 'Home',
            leds: leds
        });
    });

    app.listen(config.get('web.port'), () => {
        note('server', 'Web server listening on port ' + config.get('web.port'));
    });
};
