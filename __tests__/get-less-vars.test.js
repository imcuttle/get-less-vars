/**
 * @file lessAst
 * @author Cuttle Cong
 * @date 2019/4/13
 * @description
 */
const lessAst = require('../lib/index')
const { readSync, fixture } = require('./helper')

describe('lessAst', function() {
  it('should lessAst', async () => {
    expect(await lessAst(readSync('ast.less'), { filename: fixture('ast.less') })).toMatchInlineSnapshot(`
Object {
  "abc": "me",
  "charset_bar": "'xx'",
  "color": "#222",
  "config": Object {
    "left_px": "10px",
    "options": Object {
      "deep": Object {
        "innner": "356px",
        "left_px": "12px",
      },
      "inner_px": "356px",
    },
  },
  "foo": "xx",
  "left": "334px",
  "left_33": "me",
  "left_px": "356px",
  "lg_color": "#252525",
  "ss": "me",
  "sum": "356px",
}
`)
  })

  it('should lessAst camel', async () => {
    expect(
      (await lessAst(readSync('ast.less'), { filename: fixture('ast.less'), nameCase: 'camel' })).left33
    ).toMatchInlineSnapshot(`"me"`)
  })

  it('should lessAst with namecase', async () => {
    expect(await lessAst(readSync('ast.less'), { nameCase: 'dotCase', filename: fixture('ast.less') }))
      .toMatchInlineSnapshot(`
Object {
  "abc": "me",
  "charset.bar": "'xx'",
  "color": "#222",
  "config": Object {
    "left.px": "10px",
    "options": Object {
      "deep": Object {
        "innner": "356px",
        "left.px": "12px",
      },
      "inner.px": "356px",
    },
  },
  "foo": "xx",
  "left": "334px",
  "left.33": "me",
  "left.px": "356px",
  "lg.color": "#252525",
  "ss": "me",
  "sum": "356px",
}
`)
  })

  it('should console.error with not existed nameCase', async () => {
    const mockError = jest.spyOn(console, 'error')
    await lessAst(readSync('ast.less'), { nameCase: '404', filename: fixture('ast.less') })
    expect(mockError).toHaveBeenLastCalledWith(
      'The nameCase 404 is not existed, please use it in [noCase, no, dotCase, dot, swapCase, swap, pathCase, path, upperCase, upper, lowerCase, lower, camelCase, camel, snakeCase, snake, titleCase, title, paramCase, param, kebabCase, kebab, hyphenCase, hyphen, headerCase, header, pascalCase, pascal, constantCase, constant, sentenceCase, sentence, isUpperCase, isUpper, isLowerCase, isLower, upperCaseFirst, ucFirst, lowerCaseFirst, lcFirst]'
    )
  })

  it('without variables', async () => {
    expect(
      await lessAst(readSync('normal.less'), {
        filename: fixture('normal.less')
      })
    ).toEqual({})
  })
})
