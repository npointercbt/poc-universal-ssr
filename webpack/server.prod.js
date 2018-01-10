const path = require('path')
const webpack = require('webpack')
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin

const res = p => path.resolve(__dirname, p)

const entry = res('../server/render.js')
const output = res('../buildServer')

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: [entry],
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
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
        exclude: /node_modules/,
        use: 'css-loader/locals'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.styl']
  },
  plugins: [
    // REQUIRED: To make dynamic css work correctly
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new StatsWriterPlugin()
  ]
}
