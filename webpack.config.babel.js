'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');

const config = {
  entry: path.join(__dirname, 'assets/js/main.js'),
  output: {
    filename: path.join(__dirname, 'public/js/bundle.js')
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    new ExtractText(path.join(__dirname, 'public/css/style.css'))
  ],
  devtool: 'cheap-module-source-map',
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
    }, {
      test: /\.scss$/,
      loader: ExtractText.extract('style', 'css?sourceMap!postcss!sass?sourceMap')
    }, {
      test: /\.(woff(2)?|ttf|eot)$/,
      loader: 'url-loader?name=public/fonts/[name].[ext]'
    }]
  },
  resolve: {
    alias: {
      config: path.join(__dirname, 'assets/js/config.js')
    }
  },
  postcss: function() {
    return [cssnext];
  }
};

module.exports = config;
