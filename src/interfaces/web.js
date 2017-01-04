'use strict';

const config = require('config');
const note = require('note-log');
const express = require('express');
const session = require('express-session');
const path = require('path');

const port = config.has('web.port') ? config.web.port : 3000;

module.exports = function(leds) {
  const app = express();

  app.use(express.static('public'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  app.listen(port, () => {
    note('server', 'Web server listening on port ' + port);
  });
};
