'use strict';

require('../css/style.scss');
require('babel-polyfill');

const config = require('config');
const riot = require('riot');

require('./socket.js');

require('../tags/header.tag');
require('../tags/interval.tag');
require('../tags/color/sample.tag');
require('../tags/rgb.tag');
require('../tags/hsv.tag');
require('../tags/draw.tag');

riot.mount('ri-header, ri-interval, ri-rgb, ri-hsv, ri-draw');

riot.route.start();

riot.route((collection, id, action) => {
    console.log(collection, id, action);
});
