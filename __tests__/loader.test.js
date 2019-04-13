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
  \\"charset_bar\\": \\"'xx'\\",
  \\"foo\\": \\"xx\\",
  \\"abc\\": \\".asdasdsadasdasdsa, asdasdsa asdasdasds\\",
  \\"p-height\\": \\"200px\\",
  \\"conf\\": {
    \\"height\\": \\"10px\\"
  },
  \\"p-width\\": \\"100px\\",
  \\"color\\": \\"#222\\"
}"
`)
  })

  it('compress = true', async function() {
    let stats = await compiler('webpack-ast.less', { compress: true })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(
      `"module.exports = {\\"charset_bar\\":\\"'xx'\\",\\"foo\\":\\"xx\\",\\"abc\\":\\".asdasdsadasdasdsa, asdasdsa asdasdasds\\",\\"p-height\\":\\"200px\\",\\"conf\\":{\\"height\\":\\"10px\\"},\\"p-width\\":\\"100px\\",\\"color\\":\\"#222\\"}"`
    )
  })
})
