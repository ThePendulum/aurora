'use strict';

import createUser from '../auth/createUser.js';

const {username, password, roll, u, p, r} = require('yargs').argv;

createUser(username || u, password || p, roll || r).then(() => {
    console.log('User created successfully!');

    process.exit();
}).catch(error => {
    console.error(error);
});
