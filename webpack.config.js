/* eslint no-path-concat: off */
const webpack = require('webpack')
const fs = require('fs')
const getWebpackPlugins = require('./getWebpackPlugins')

const defaultBabelConfig = JSON.parse(fs.readFileSync('.babelrc', {encoding: 'utf8'}))

const rules = (() => {
  // webpack 2 resolves es2015 imports
  const presets = [
    ['es2015', {modules: false}]
  ].concat(defaultBabelConfig.presets.filter(v => v !== 'es2015'))

  const result = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: Object.assign({}, defaultBabelConfig, {babelrc: false, presets})
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.scss/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ]

  const resources = {
    eot: 'vnd.ms-fontobject',
    ttf: 'application/font-sfnt',
    woff: 'application/font-woff',
    woff2: 'application/font-woff2',
    svg: 'image/svg+xml',
    jpg: 'image/jpg',
    png: 'image/png',
    gif: 'image/gif'
  }

  // anything smaller than 50K will be embedded as url(data:...)
  // larger files will be emitted
  const addUrlLoader = (extension, mimeType) => {
    result.push({
      test: new RegExp(`\\.${extension}$`),
      loader: 'url-loader',
      query: {
        mimetype: mimeType,
        limit: 50000,
        name: '[name].[ext]'
      }
    })
  }

  for (let extension in resources) {
    addUrlLoader(extension, resources[extension])
  }

  return result
})()

const entry = {
  bundle: ['babel-polyfill', './lib/index.js']
}

module.exports = {
  entry,
  output: {
    path: __dirname + '/public',
    filename: '[name].js'
  },
  module: {rules},
  devtool: 'source-map',
  plugins: getWebpackPlugins()
}
