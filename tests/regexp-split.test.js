/* eslint-env node, mocha */
const assert = require('chai').assert
const regexpSplitES6 = require('../lib/regexp-split')
const regexpSplitES5 = require('../es5/regexp-split')

const esversion = ['es6', 'es5']

describe('regexpSplit', function () {
  [regexpSplitES6, regexpSplitES5].forEach(function (regexpSplit, i) {
    describe(esversion[i], function () {
      it('should split with global re', function () {
        const re = /\s+/g
        const iter = regexpSplit(re, 'ab s   d')
        assert.deepEqual(Array.from(iter), 'ab s   d'.split(re))
      })
      it('should split with global re (2)', function () {
        const re = /\s+/g
        const iter = regexpSplit(re, 'ab s   d  ')
        assert.deepEqual(Array.from(iter), 'ab s   d  '.split(re))
      })
      it('should split with non global re', function () {
        const re = /\s+/
        const iter = regexpSplit(re, 'ab s   d')
        assert.deepEqual(Array.from(iter), 'ab s   d'.split(re))
      })
      it('should split with string', function () {
        const re = ' '
        const iter = regexpSplit(re, 'ab s d')
        assert.deepEqual(Array.from(iter), 'ab s d'.split(' '))
      })
      it('should split with empty string', function () {
        const re = ''
        const iter = regexpSplit(re, 'abc')
        assert.deepEqual(Array.from(iter), 'abc'.split(re))
      })
    })
  })
})
