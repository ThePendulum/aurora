'use strict';

import createUser from '../auth/createUser.js';

const {username, password, type, u, p, t} = require('yargs').argv;

createUser(username || u, password || p, type || t);
