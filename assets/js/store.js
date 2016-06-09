'use strict';

const redux = require('redux');
const Immutable = require('immutable');
const thunk = require('redux-thunk').default;

const reducer = require('./reducer.js');

module.exports = redux.createStore(reducer, Immutable.Map(), redux.applyMiddleware(thunk));
