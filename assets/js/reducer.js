'use strict';

const {combineReducers} = require('redux-immutable');

const canvas = require('./reducers/canvas.js');
const color = require('./reducers/color.js');

module.exports = combineReducers({canvas, color});
