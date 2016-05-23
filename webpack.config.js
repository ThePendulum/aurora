'use strict';

const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.join(__dirname, 'assets/js/main.js');
const BUILD_DIR = path.join(__dirname, 'public/js/bundle.js');

const config = {
  entry: APP_DIR,
  output: {
    filename: BUILD_DIR
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [{
      test: /\.tag$/,
      exclude: /node_modules/,
      loader: 'riotjs-loader',
      query: {
        type: 'none'
      }
    }],
    loaders: [{
      test: /\.js$|\.tag$/,
      include: APP_DIR,
      loader: 'babel'
    }]
  },
  resolve: {
    alias: {
      config: path.join(__dirname, 'assets/js/config.js')
    }
  }
};

module.exports = config;
