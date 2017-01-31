'use strict';

import socket from '../../../socket.js';

export default function(context, smoothing) {
    context.commit('smoothing', smoothing);
    socket.transmit('smoothing', smoothing);
};
