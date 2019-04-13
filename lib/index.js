/**
 * @file lessAst
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/4/13
 *
 */
const less = require('less')
const contexts = require('less/lib/less/contexts')
const changeCase = require('change-case')

const toCSS = (value, options = {}) => {
  if (!value) return null

  options = Object.assign(
    {
      transformName: name => name,
      frames: []
    },
    options
  )

  if (['Ruleset'].includes(value.type)) {
    return toCSSMap(
      value.variables(),
      Object.assign(options, {
        frames: [].concat(options.frames, value)
      })
    )
  }

  if (['DetachedRuleset'].includes(value.type)) {
    return toCSSMap(
      value.ruleset.variables(),
      Object.assign(options, {
        frames: [].concat(options.frames, value.ruleset, value.frames || [])
      })
    )
  }

  const evalCtx = new contexts.Eval(options)
  evalCtx.frames = (options.frames || []).concat(evalCtx.frames)

  // value.frames = evalCtx.frames
  return value.eval(evalCtx).toCSS(options)

  // const parseTree = new less.ParseTree(value.eval(evalCtx), imports)
  // return parseTree.toCSS(options).css
}

const toCSSMap = (vars, options) => {
  options = Object.assign(
    {
      transformName: name => name
    },
    options
  )

  const varSet = {}
  Object.keys(vars || {}).forEach(name => {
    varSet[options.transformName(name.replace(/^@/, ''))] = toCSS(vars[name].value, options)
  })
  return varSet
}

module.exports = function lessAST(lessText, options = {}) {
  options = Object.assign(
    {
      relativeUrls: true,
      nameCase: null
    },
    options
  )

  return new Promise(function(resolve, reject) {
    less.parse(lessText, options, function(err, root, imports, options) {
      if (err) {
        reject(err)
      } else {
        let transformName = name => name
        if (options.nameCase) {
          if (typeof changeCase[options.nameCase] !== 'function') {
            console.error(
              `The nameCase ${options.nameCase} is not existed, please use it in [${Object.keys(changeCase).join(
                ', '
              )}]`
            )
          } else {
            transformName = changeCase[options.nameCase]
          }
        }

        resolve(toCSS(root, { transformName, frames: [root] }))
      }
    })
  })
}
