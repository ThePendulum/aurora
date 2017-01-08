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
        new ExtractText(path.join(__dirname, 'public/css/style.css')),
        new webpack.OldWatchingPlugin()
    ],
    devtool: 'eval-source-map',
    module: {
        loaders: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue'
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-3'],
                plugins: ['transform-object-rest-spread']
            },
        }, {
            test: /\.scss$/,
            loader: ExtractText.extract('style', 'css?sourceMap!postcss!sass?sourceMap')
        }, {
            test: /\.(woff(2)?|ttf|eot)$/,
            loader: 'url-loader?name=public/fonts/[name].[ext]'
        }, {
            test: /\.svg/,
            loader: 'raw-loader'
        }]
    },
    vue: {
        loaders: {
            css: ExtractText.extract('css'),
            sass: ExtractText.extract('css!sass')
        }
    },
    postcss: function() {
        return [cssnext];
    },
    resolve: {
        alias: {
            config: path.join(__dirname, 'assets/js/config.js'),
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};

module.exports = config;
