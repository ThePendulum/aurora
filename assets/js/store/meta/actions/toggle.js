'use strict';

import socket from '../../../socket.js';

export default function(context, on) {
    context.commit('toggle', on);

    socket.send(JSON.stringify(['toggle', on]));
};
