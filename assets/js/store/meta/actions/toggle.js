'use strict';

import socket from '../../../socket.js';

export default function(context, on) {
    context.commit('toggle', on);
    socket.transmit('toggle', on);
};
