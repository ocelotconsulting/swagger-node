const webpack = require('webpack')
const {version} = require('./package.json')

const createBundleAnalyzerPlugin = () => {
  const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
  return new BundleAnalyzerPlugin()
}

module.exports = (env = 'production') => {
  const dev = env === 'development'

  return [
    dev && new webpack.HotModuleReplacementPlugin(),
    dev && new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        APP_VERSION: JSON.stringify(version)
      }
    }),
    !dev && new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    process.env.ANALYZE_WEBPACK && createBundleAnalyzerPlugin()
  ].filter(Boolean)
}
