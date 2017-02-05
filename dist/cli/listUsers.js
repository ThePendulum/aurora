'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _getUsers = require('../auth/getUsers.js');

var _getUsers2 = _interopRequireDefault(_getUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require$argv = require('yargs').argv,
    username = _require$argv.username,
    password = _require$argv.password,
    roll = _require$argv.roll,
    u = _require$argv.u,
    p = _require$argv.p,
    r = _require$argv.r;

var table = new _cliTable2.default({
    head: ['#', 'username', 'role']
});

(0, _getUsers2.default)().then(function (users) {
    table.push.apply(table, _toConsumableArray(users.map(function (user, index) {
        return [index, user.username, user.role];
    })));

    console.log('Total: ' + users.length);
    console.log(table.toString());

    process.exit();
}).catch(function (error) {
    console.error(error);
});