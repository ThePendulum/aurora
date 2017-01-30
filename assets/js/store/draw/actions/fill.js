'use strict';

import socket from '../../../socket.js';

export default function(context, pencil) {
    context.commit('fill', pencil);
    socket.transmit('fill', pencil);
};
