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
"module.exports = {
  \\"charsetBar\\": \\"'xx'\\",
  \\"foo\\": \\"xx\\",
  \\"abc\\": \\".asdasdsadasdasdsa, asdasdsa asdasdasds\\",
  \\"pHeight\\": \\"200px\\",
  \\"conf\\": {
    \\"height\\": \\"10px\\"
  },
  \\"pWidth\\": \\"100px\\",
  \\"color\\": \\"#222\\"
}"
`)
  })

  it('compress = true', async function() {
    let stats = await compiler('webpack-ast.less', { compress: true })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(
      `"module.exports = {\\"charsetBar\\":\\"'xx'\\",\\"foo\\":\\"xx\\",\\"abc\\":\\".asdasdsadasdasdsa, asdasdsa asdasdasds\\",\\"pHeight\\":\\"200px\\",\\"conf\\":{\\"height\\":\\"10px\\"},\\"pWidth\\":\\"100px\\",\\"color\\":\\"#222\\"}"`
    )
  })

  it('nameCase = camel', async function() {
    let stats = await compiler('webpack-ast.less', { nameCase: 'camel' })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(`
"module.exports = {
  \\"charsetBar\\": \\"'xx'\\",
  \\"foo\\": \\"xx\\",
  \\"abc\\": \\".asdasdsadasdasdsa, asdasdsa asdasdasds\\",
  \\"pHeight\\": \\"200px\\",
  \\"conf\\": {
    \\"height\\": \\"10px\\"
  },
  \\"pWidth\\": \\"100px\\",
  \\"color\\": \\"#222\\"
}"
`)
  })

  it('webpack-ast.js use inline', async function() {
    let stats = await compiler('webpack-ast.js', { nameCase: 'camel' })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(`
"module.exports = {
  \\"charset.bar\\": \\"'xx'\\",
  \\"foo\\": \\"xx\\",
  \\"abc\\": \\".asdasdsadasdasdsa, asdasdsa asdasdasds\\",
  \\"p.height\\": \\"200px\\",
  \\"conf\\": {
    \\"height\\": \\"10px\\"
  },
  \\"p.width\\": \\"100px\\",
  \\"color\\": \\"#222\\"
}"
`)
  })
})
