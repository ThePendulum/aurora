'use strict';

import socket from '../../../socket.js';

export default function(context) {
    context.commit('fill', null);
    socket.transmit('fill', null);
};
