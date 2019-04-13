/**
 * @file lessAst
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/4/13
 *
 */
const less = require('less')
const contexts = require('less/lib/less/contexts')
const { Ruleset } = require('less/lib/less/tree')

const mapVariables = variables => {
  if (typeof variables === 'object' && !Array.isArray(variables)) {
    let newVars = {}
    Object.keys(variables).map(name => {
      newVars[name.replace(/^@/, '')] = variables[name].value
    })
    return newVars
  }

  return variables
}

module.exports = function lessAST(lessText, options = {}) {
  options = Object.assign(
    {
      // paths: []
    },
    options
  )

  return new Promise(function(res, rej) {
    less.parse(lessText, options, function(err, root, imports, options) {
      const toCSS = value => {
        options = Object.assign({}, options, {
          // compress: true
        })

        const evalCtx = new contexts.Eval(options)
        evalCtx.frames.unshift(root)

        const parseTree = new less.ParseTree(value.eval(evalCtx), imports)
        return parseTree.toCSS(options).css
      }

      if (err) {
        rej(err)
      } else {
        // const context = new less.contexts.Eval(options)
        const vars = root.variables()
        Object.keys(vars).forEach(name => {
          console.log('raw', toCSS(vars[name]))
        })
        console.log(toCSS(root))
        res(root)
      }
    })
  })
}
