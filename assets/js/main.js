'use strict';

require('babel-polyfill');

const config = require('config');
const socket = new WebSocket(config.socket.host);

const riot = require('riot');

require('../tags/header.tag');
require('../tags/interval.tag');
require('../tags/color.tag');
require('../tags/color/rgb.tag');
require('../tags/color/hsv.tag');
require('../tags/color/sample.tag');
require('../tags/draw.tag');

riot.mount('ri-header, ri-interval, ri-color, ri-draw', {socket});

riot.route.start();

riot.route((collection, id, action) => {
    console.log(collection, id, action);
});
