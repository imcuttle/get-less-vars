# get-less-vars (WIP)

[![Build status](https://img.shields.io/travis/imcuttle/get-less-vars/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/get-less-vars)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/get-less-vars.svg?style=flat-square)](https://codecov.io/github/imcuttle/get-less-vars?branch=master)
[![NPM version](https://img.shields.io/npm/v/get-less-vars.svg?style=flat-square)](https://www.npmjs.com/package/get-less-vars)
[![NPM Downloads](https://img.shields.io/npm/dm/get-less-vars.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/get-less-vars)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> The way for getting variables from less

## Installation

```bash
npm install less get-less-vars
# or use yarn
yarn add less get-less-vars
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### getLessVars

[lib/index.js:90-121](https://github.com/imcuttle/get-less-vars/blob/46e41e9256886f9cc1ad389f3416ea97eb4a6aeb/lib/index.js#L90-L121 'Source code on GitHub')

- **See: [less options](http://lesscss.org/usage/#less-options)**

#### Parameters

- `lessText` {string}
- `options` {{}}
  - `options.nameCase` {string}
    Use [change-case](https://www.npmjs.com/package/change-case) for varied name case. (optional, default `null`)

#### Examples

```javascript
const getLessVars = require('get-less-vars')
const fs = require('fs')

// The contents of `/path/to/main.less`
// @color: white;
// @height: 100px;
// @width: 20px + @height;
// @height: 40px;

;(async () => {
  await getLessVars(fs.readFileSync('/path/to/main.less').toString(), {
    filename: '/path/to/main.less'
  })
  // => {color: 'white', height: '40px', width: '60px'}
})()
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;{}>**

## Regard as a webpack loader

### Loader Options

The options extend get-less-var

#### `disableWebpackLessPlugin`

Whether disable the less plugin from [less-loader](https://github.com/webpack-contrib/less-loader/blob/3d6e9e9204a9e02cde5a65e9a9f6b10bd564f365/src/createWebpackLessPlugin.js)  
which enhanced the `@import` like `@import '~lib/foo.less'`

- **Type:** `boolean`
- **Default:** `false`

#### `nameCase`

- **Type:** `string`
- **Default:** `'camel'`

### Example

- `main.less`

```less
@main_color: red;

@config: {
  @size: 20px;
};
```

- `main.js`

```javascript
const { config, mainColor } = require('!get-less-vars/loader!./main.less')
// => mainColor === 'red'
// => config {size: '20px'}
```

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:moyuyc95@gmail.com">moyuyc95@gmail.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
