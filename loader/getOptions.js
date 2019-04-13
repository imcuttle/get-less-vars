/**
 * @file getOptions
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/4/14
 *
 */
const loaderUtils = require('loader-utils')
const clone = require('clone')
const createWebpackLessPlugin = require('less-loader/dist/createWebpackLessPlugin')

function getOptions(loaderContext) {
  var options = Object.assign(
    {
      plugins: [],
      relativeUrls: true,
      compress: Boolean(loaderContext.minimize),
      disableWebpackLessPlugin: false
    },
    clone(loaderUtils.getOptions(loaderContext))
  )

  // We need to set the filename because otherwise our WebpackFileManager will receive an undefined path for the entry
  options.filename = loaderContext.resource

  if (!options.disableWebpackLessPlugin) {
    // It's safe to mutate the array now because it has already been cloned
    options.plugins.push(createWebpackLessPlugin(loaderContext))
  }

  return options
}

module.exports = getOptions
