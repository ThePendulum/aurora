'use strict';

import config from 'config';

const socket = new WebSocket(config.socket.host);

export default socket;
