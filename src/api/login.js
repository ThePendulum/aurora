'use strict';

import note from 'note-log';
import util from 'util';
import login from '../auth/login.js';

export default function(req, res) {
    return login(req.body.username, req.body.password).then(results => {
        req.session.authenticated = true;

        res.redirect('/');
    }).catch(error => {
        res.redirect('/login');
    });
};
