'use strict';

var _createUser = require('../auth/createUser.js');

var _createUser2 = _interopRequireDefault(_createUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$argv = require('yargs').argv,
    username = _require$argv.username,
    password = _require$argv.password,
    roll = _require$argv.roll,
    u = _require$argv.u,
    p = _require$argv.p,
    r = _require$argv.r;

(0, _createUser2.default)(username || u, password || p, roll || r).then(function () {
    console.log('User created successfully!');

    process.exit();
}).catch(function (error) {
    console.error(error);
});