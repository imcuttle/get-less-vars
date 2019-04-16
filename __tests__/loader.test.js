/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const compiler = require('./compiler')

describe('loader', function() {
  it('should output normally', async function() {
    let stats = await compiler('webpack-ast.less')
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(`
"export var charsetBar = \\"'xx'\\";
export var foo = \\"xx\\";
export var abc = \\".asdasdsadasdasdsa, asdasdsa asdasdasds\\";
export var pHeight = \\"200px\\";
export var conf = {
  \\"height\\": \\"10px\\"
};
export var pWidth = \\"100px\\";
export var color = \\"#222\\";"
`)
  })

  it('compress = true', async function() {
    let stats = await compiler('webpack-ast.less', { compress: true, modules: 'cjs' })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(
      `"module.exports = {\\"charsetBar\\":\\"'xx'\\",\\"foo\\":\\"xx\\",\\"abc\\":\\".asdasdsadasdasdsa, asdasdsa asdasdasds\\",\\"pHeight\\":\\"200px\\",\\"conf\\":{\\"height\\":\\"10px\\"},\\"pWidth\\":\\"100px\\",\\"color\\":\\"#222\\"}"`
    )
  })

  it('nameCase = camel', async function() {
    let stats = await compiler('webpack-ast.less', { nameCase: 'camel' })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(`
"export var charsetBar = \\"'xx'\\";
export var foo = \\"xx\\";
export var abc = \\".asdasdsadasdasdsa, asdasdsa asdasdasds\\";
export var pHeight = \\"200px\\";
export var conf = {
  \\"height\\": \\"10px\\"
};
export var pWidth = \\"100px\\";
export var color = \\"#222\\";"
`)
  })

  it('webpack-ast.js use inline', async function() {
    let stats = await compiler('webpack-ast.js')
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(`
"exports[\\"charset.bar\\"] = \\"'xx'\\";
export var foo = \\"xx\\";
export var abc = \\".asdasdsadasdasdsa, asdasdsa asdasdasds\\";
exports[\\"p.height\\"] = \\"200px\\";
export var conf = {
  \\"height\\": \\"10px\\"
};
exports[\\"p.width\\"] = \\"100px\\";
export var color = \\"#222\\";"
`)
  })
})
