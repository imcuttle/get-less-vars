/**
 * @file helper
 */

const nps = require('path')
const fs = require('fs')

function fixture() {
  return nps.join.apply(nps, [__dirname, 'fixture'].concat([].slice.call(arguments)))
}

function readSync(name) {
  return fs.readFileSync(fixture(name)).toString()
}

module.exports = {
  fixture,
  readSync
}
