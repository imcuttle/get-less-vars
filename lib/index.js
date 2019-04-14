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
      frames: [],
      returnRawValue: false
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

  if (options.returnRawValue) {
    const evalCtx = new contexts.Eval(options)
    evalCtx.frames = (options.frames || []).concat(evalCtx.frames)

    const parseTree = new less.ParseTree(value.eval(evalCtx), options.imports)
    const css = parseTree.toCSS(options).css
    return value.toCSS(options)
  }

  const evalCtx = new contexts.Eval(options)
  evalCtx.frames = (options.frames || []).concat(evalCtx.frames || [])

  return value.eval(evalCtx).toCSS(options)

  // const parseTree = new less.ParseTree(value.eval(evalCtx), [])
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

/**
 * @public
 * @name getLessVars
 * @param lessText {string}
 * @param options {{}}
 * @param [options.nameCase=null] {string}
 *    Use [change-case](https://www.npmjs.com/package/change-case) for varied name case.
 * @see [less options](http://lesscss.org/usage/#less-options)
 * @return {Promise<{}>}
 * @example
 * const getLessVars = require('get-less-vars')
 * const fs = require('fs')
 *
 * // The contents of `/path/to/main.less`
 * // @color: white;
 * // @height: 100px;
 * // @width: 20px + @height;
 * // @height: 40px;
 *
 * ;(async () => {
 *   await getLessVars(fs.readFileSync('/path/to/main.less').toString(), {
 *     filename: '/path/to/main.less'
 *   })
 *   // => {color: 'white', height: '40px', width: '60px'}
 * })()
 */
module.exports = function getLessVars(lessText, options = {}) {
  options = Object.assign(
    {
      relativeUrls: true,
      nameCase: null,
      returnRawValue: false
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

        resolve(toCSS(root, { transformName, frames: [root], imports, returnRawValue: options.returnRawValue }))
      }
    })
  })
}
