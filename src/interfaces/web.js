'use strict';

const config = require('config');
const note = require('note-log');
const express = require('express');
const path = require('path');

module.exports = function(leds) {
    const app = express();

    app.use(express.static('public'));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'));
    });

    app.listen(config.get('web.port'), () => {
        note('server', 'Web server listening on port ' + config.get('web.port'));
    });
};
