'use strict';

import socket from '../../../socket.js';

export default function(context, pencil) {
    context.commit('draw', pencil);
    socket.transmit('draw', pencil);
};
