const path = require('path')
const webpack = require('webpack')
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/dev/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractCssChunks.extract({
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.styl']
  },
  plugins: [
    new StatsWriterPlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: '[name].js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourceMap: true
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
}
