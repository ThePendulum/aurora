'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _noteLog = require('note-log');

var _noteLog2 = _interopRequireDefault(_noteLog);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressWs = require('express-ws');

var _expressWs2 = _interopRequireDefault(_expressWs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _error = require('./api/error.js');

var _error2 = _interopRequireDefault(_error);

var _login = require('./api/login.js');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = _config2.default.has('web.port') ? _config2.default.web.port : 3000;

module.exports = function (leds) {
    var app = (0, _express2.default)();
    var router = (0, _expressPromiseRouter2.default)();
    var ws = (0, _expressWs2.default)(app);

    app.use((0, _expressSession2.default)(_extends({
        genid: _uuid2.default
    }, _config2.default.session)));

    router.use(_bodyParser2.default.json());
    router.use(_bodyParser2.default.urlencoded({
        extended: false
    }));

    router.use('/css', _express2.default.static('public/css'));
    router.use('/js', _express2.default.static('public/js'));
    router.use('/img', _express2.default.static('public/img'));

    app.use(router);
    app.use(_error2.default);

    router.get('/login', function (req, res) {
        res.sendFile(_path2.default.join(__dirname, '../public/login.html'));
    });

    router.post('/api/login', _login2.default);

    router.ws('/socket', function (ws, req) {
        (0, _noteLog2.default)('web', 0, _util2.default.inspect(ws), _util2.default.inspect(req.session));

        ws.on('message', function (msg) {
            (0, _noteLog2.default)('socket', 0, _util2.default.inspect(msg));
        });
    });

    router.get('*', function (req, res) {
        (0, _noteLog2.default)('web', 0, _util2.default.inspect(req));

        if (!_config2.default.requireAuth || req.session.authenticated) {
            res.sendFile(_path2.default.join(__dirname, '../public/index.html'));
        } else {
            res.redirect('/login');
        }
    });

    app.listen(port, function () {
        (0, _noteLog2.default)('server', 'Web server listening on port ' + port);
    });
};