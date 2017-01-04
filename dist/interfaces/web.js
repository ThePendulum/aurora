'use strict';

var config = require('config');
var note = require('note-log');
var express = require('express');
var session = require('express-session');
var path = require('path');

var port = config.has('web.port') ? config.web.port : 3000;

module.exports = function (leds) {
  var app = express();

  app.use(express.static('public'));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  app.listen(port, function () {
    note('server', 'Web server listening on port ' + port);
  });
};