'use strict';

import socket from '../../../socket.js';

export default function(context, modulation) {
    context.commit('setModulation', modulation);
    socket.transmit('modulation', modulation);
};
