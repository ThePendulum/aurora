'use strict';

var _noteLog = require('note-log');

var _noteLog2 = _interopRequireDefault(_noteLog);

var _createUser = require('../auth/createUser.js');

var _createUser2 = _interopRequireDefault(_createUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$argv = require('yargs').argv;

var username = _require$argv.username;
var password = _require$argv.password;
var roll = _require$argv.roll;
var u = _require$argv.u;
var p = _require$argv.p;
var r = _require$argv.r;


(0, _createUser2.default)(username || u, password || p, roll || r).then(function () {
    console.log('User created successfully!');

    process.exit();
}).catch(function (error) {
    console.error(error);
});