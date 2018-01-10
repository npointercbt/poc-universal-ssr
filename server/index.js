require('colors')
const fs = require('fs');
const path = require('path')
const express = require('express')
const webpack = require('webpack') // aliased to webpack-universal
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')
const clientConfigProd = require('../webpack/client.prod')
const serverConfigProd = require('../webpack/server.prod')

const publicPath = clientConfig.output.path
const outputPath = clientConfig.output.path
const DEV = process.env.NODE_ENV === 'development'
const app = express()

let isBuilt = false

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true
    console.log('BUILD COMPLETE -- Listening @ http://localhost:3000'.magenta)
  })

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig])
  const clientCompiler = compiler.compilers[0]
  const options = { publicPath, stats: { colors: true } }

  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  compiler.plugin('done', done)
}
else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]

    fs.writeFile(path.resolve(__dirname, "../clientStats.json"), JSON.stringify(clientStats), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`The client stats was saved to ${path.resolve(__dirname, "../clientStats.json")} `);
    }); 

    const serverRender = require('../buildServer/main.js').default

    console.log({publicPath, outputPath})

    app.use('/dev', express.static(outputPath))
    app.use('/dev', serverRender({ clientStats }))

    done()
  })
}
