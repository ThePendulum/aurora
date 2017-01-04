'use strict';

var _createUser = require('../auth/createUser.js');

var _createUser2 = _interopRequireDefault(_createUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$argv = require('yargs').argv;

var username = _require$argv.username;
var password = _require$argv.password;
var type = _require$argv.type;


(0, _createUser2.default)(username, password, type).then(function (result) {
    console.log(result);
});