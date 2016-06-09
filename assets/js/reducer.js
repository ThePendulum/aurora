'use strict';

const {combineReducers} = require('redux-immutable');

const color = require('./reducers/color.js');

module.exports = combineReducers({color});
