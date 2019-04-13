/**
 * @file compiler
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/4/14
 *
 */
const path = require('path')
const webpack = require('webpack')
const Memoryfs = require('memory-fs')

const h = require('./helper')

module.exports = (fixture, options) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./fixture/${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: require.resolve('../loader'),
              options
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '/als': h.fixture('alias')
      }
    }
  })
  compiler.outputFileSystem = new Memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err || stats.compilation.errors[0])

      resolve(stats)
    })
  })
}
