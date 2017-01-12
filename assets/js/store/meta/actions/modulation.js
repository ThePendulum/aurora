'use strict';

import socket from '../../../socket.js';

export default function(context, modulation) {
    context.commit('modulation', modulation);
    socket.transmit('modulation', modulation);
};
