'use strict';

import socket from '../../../socket.js';

export default function(context, pencil) {
    socket.transmit('fill', pencil);
};
