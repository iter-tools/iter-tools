/* eslint-env node, mocha */
const assert = require('chai').assert
const regexpSplitES6 = require('../dist/es2018/regexp-split')
const regexpSplitES5 = require('../dist/es5/regexp-split')

const esversion = ['es6', 'es5']

describe('regexpSplit', function () {
  [regexpSplitES6, regexpSplitES5].forEach(function (regexpSplit, i) {
    describe(esversion[i], function () {
      it('should split with global re', function () {
        const re = /\s+/g
        const iter = regexpSplit(re, 'ab s   d')
        assert.deepEqual(Array.from(iter), 'ab s   d'.split(re))
      })
      it('can be curried', function () {
        const re = /\s+/g
        const splitter = regexpSplit(re)
        const iter1 = splitter('ab s   d')
        assert.deepEqual(Array.from(iter1), 'ab s   d'.split(/\s+/g))
        const iter2 = splitter(' xx xx')
        assert.deepEqual(Array.from(iter2), ' xx xx'.split(/\s+/g))
      })
      it('should split with global re (2)', function () {
        const re = /\s+/g
        const iter = regexpSplit(re, 'ab s   d  ')
        assert.deepEqual(Array.from(iter), 'ab s   d  '.split(/\s+/g))
      })
      it('should split (nothing to split)', function () {
        const re = /\s+/g
        const iter = regexpSplit(re, 'absd')
        assert.deepEqual(Array.from(iter), 'absd'.split(re))
      })
      it('should split with non global re', function () {
        const re = /\s+/
        const iter = regexpSplit(re, 'ab s   d')
        assert.deepEqual(Array.from(iter), 'ab s   d'.split(/\s+/))
      })
      it('should split with string', function () {
        const re = ' '
        const iter = regexpSplit(re, 'ab s d')
        assert.deepEqual(Array.from(iter), 'ab s d'.split(' '))
      })
      it('should split with empty string', function () {
        const re = ''
        const iter = regexpSplit(re, 'abc')
        assert.deepEqual(Array.from(iter), 'abc'.split(''))
      })
    })
  })
})
