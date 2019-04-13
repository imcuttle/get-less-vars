/**
 * @file lessAst
 * @author Cuttle Cong
 * @date 2019/4/13
 * @description
 */
const lessAst = require('../lib/lessAst')
const { readSync, fixture } = require('./helper')
const createWebpackLessPlugin = require('less-loader/dist/createWebpackLessPlugin')

// const less = require('less')
//
// less.parse()

describe('lessAst', function() {
  it('should lessAst', async () => {
    // console.log(
    await lessAst(readSync('ast.less'), { filename: fixture('ast.less') })
    // )
  })

  it('should lessAst on webpack ast', async () => {
    console.log(
      await lessAst(readSync('ast.less'), {
        plugins: [createWebpackLessPlugin()],
        filename: fixture('ast.less')
      })
    )
  })
})
