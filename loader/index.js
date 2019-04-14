/**
 * @file index
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/4/14
 *
 */
const getOptions = require('./getOptions')
const getLessVars = require('..')

module.exports = function(content) {
  const loaderContext = this
  const options = getOptions(loaderContext)

  return getLessVars(content, options).then(vars => {
    return `module.exports = ${JSON.stringify(vars, null, options.compress ? 0 : 2)}`
  })
}
