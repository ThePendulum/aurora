'use strict';

require('../css/style.scss');
require('babel-polyfill');

const riot = require('riot');

require('../tags/');
riot.mount('ri-phantom, ri-header, ri-interval, ri-hex, ri-rgb, ri-hsv, ri-draw');
