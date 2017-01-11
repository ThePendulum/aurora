'use strict';

import config from 'config';
import util from 'util';
import note from 'note-log';
import express from 'express';
import Router from 'express-promise-router';
import session from 'express-session';
import expressWs from 'express-ws';
import bodyParser from 'body-parser';
import path from 'path';
import uuid from 'uuid';

const port = config.has('web.port') ? config.web.port : 3000;

import errorHandler from './api/error.js';
import login from './api/login.js';

module.exports = function(leds) {
    const app = express();
    const router = Router();
    const ws = expressWs(app);

    app.use(session({
        genid: uuid,
        ...config.session
    }));

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({
        extended: false
    }));

    router.use('/css', express.static('public/css'));
    router.use('/js', express.static('public/js'));
    router.use('/img', express.static('public/img'));

    app.use(router);
    app.use(errorHandler);

    router.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    });

    router.post('/api/login', login);

    router.ws('/socket', (ws, req) => {
        note('web', 0, util.inspect(ws), util.inspect(req.session));

        ws.on('message', msg => {
            note('socket', 0, util.inspect(msg));
        });
    });

    router.get('*', (req, res) => {
        if(!config.requireAuth || req.session.authenticated) {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        } else {
            res.redirect('/login');
        }
    });

    app.listen(port, () => {
        note('server', 'Web server listening on port ' + port);
    });
};
