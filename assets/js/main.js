'use strict';

const config = require('config');
const socket = new WebSocket(config.socket.host);

const riot = require('riot');

require('../riot-tags/interval.tag');
require('../riot-tags/pattern.tag');
riot.mount('*', {socket});
