'use strict';

const {combineReducers} = require('redux-immutable');

const spec = require('./reducers/spec.js');
const color = require('./reducers/color.js');
const presets = require('./reducers/presets.js');

module.exports = combineReducers({spec, color, presets});
