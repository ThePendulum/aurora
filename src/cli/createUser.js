'use strict';

import createUser from '../auth/createUser.js';

const {username, password, type} = require('yargs').argv;

createUser(username, password, type).then(result => {
    console.log(result);
});
