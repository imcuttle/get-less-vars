/**
 * @file index
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/4/14
 *
 */
const isVarName = require('is-var-name')

const getOptions = require('./getOptions')
const getLessVars = require('..')

module.exports = function(content) {
  const loaderContext = this
  const options = getOptions(loaderContext)

  const stringify = value => JSON.stringify(value, null, options.compress ? 0 : 2)

  return getLessVars(content, options).then(vars => {
    if (options.modules === 'es') {
      const chunks = Object.keys(vars).reduce((list, name) => {
        if (isVarName(name)) {
          list.push([`export var ${name} = ${stringify(vars[name])};`])
        } else {
          list.push(`exports[${JSON.stringify(name)}] = ${stringify(vars[name])};`)
        }
        return list
      }, [])
      return chunks.join('\n')
    }

    return `module.exports = ${stringify(vars)}`
  })
}
