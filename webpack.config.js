'use strict';

const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.join(__dirname, 'assets/js/');
const BUILD_DIR = path.join(__dirname, 'public/js/');

const config = {
  entry: APP_DIR + 'main.js',
  output: {
    filename: BUILD_DIR + 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  devtool: 'source-map',
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
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-3'],
        plugins: ['transform-object-rest-spread']
      }
    }]
  },
  resolve: {
    alias: {
      config: path.join(__dirname, 'assets/js/config.js')
    }
  }
};

module.exports = config;
