'use strict';

import util from 'util';
import Table from 'cli-table';
import getUsers from '../auth/getUsers.js';

const {username, password, roll, u, p, r} = require('yargs').argv;

const table = new Table({
    head: ['#', 'username', 'role']
});

getUsers().then(users => {
    table.push(...users.map((user, index) => [index, user.username, user.role]));

    console.log('Total: ' + users.length);
    console.log(table.toString());

    process.exit();
}).catch(error => {
    console.error(error);
});
