'use strict';

const config = require('config');
const util = require('util');
const note = require('note-log');
const express = require('express');
const Router = require('express-promise-router');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const uuid = require('uuid');

const port = config.has('web.port') ? config.web.port : 3000;

const errorHandler = require('./api/error.js');
const login = require('./api/login.js');

module.exports = function(leds) {
    const app = express();
    const router = Router();

    router.use(bodyParser.json());
    router.use(express.static('public'));

    app.use(session({
        genid: uuid,
        ...config.session
    }));

    app.use(router);
    app.use(errorHandler);

    router.post('/api/login', login);

    router.get('*', (req, res) => {
        note(util.inspect(req.session));

        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.listen(port, () => {
        note('server', 'Web server listening on port ' + port);
    });
};
