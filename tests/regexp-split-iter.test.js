/* eslint-env node, mocha */
const assert = require('chai').assert
const regexpSplitES6Iter = require('../lib/regexp-split-iter')
const regexpSplitES5Iter = require('../es5/regexp-split-iter')

const esversion = ['es6', 'es5']

describe('regexpSplitIter', function () {
  [regexpSplitES6Iter /* regexpSplitES5Iter */].forEach(function (regexpSplitIter, i) {
    describe(esversion[i], function () {
      it('should split 1', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, ['aa', 'b', 'cc'])
        assert.deepEqual(Array.from(iter), ['aabcc'])
      })
      it('should split 2', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, ['aa', ' b ', 'cc'])
        assert.deepEqual(Array.from(iter), ['aa', 'b', 'cc'])
      })
      it('should split 3', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, [' aa', ' b ', '    cc '])
        assert.deepEqual(Array.from(iter), ['', 'aa', 'b', 'cc', ''])
      })
      it('should split 4', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, ['aa     ', '', ' b ', '    cc '])
        assert.deepEqual(Array.from(iter), ['aa', 'b', 'cc', ''])
      })
      it('should split 5', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, ['aa     ', ' ', '', ' ', 'b ', '    cc '])
        assert.deepEqual(Array.from(iter), ['aa', 'b', 'cc', ''])
      })
      it('should split 6', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, ['', ' aa', ' b ', '    cc ', ''])
        assert.deepEqual(Array.from(iter), ['', 'aa', 'b', 'cc', ''])
      })
      it('should split 7', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, [' ', ' aa', ' b ', '    cc ', ' '])
        assert.deepEqual(Array.from(iter), ['', 'aa', 'b', 'cc', ''])
      })
      it('can be curried', function () {
        const re = /\s+/g
        const splitter = regexpSplitIter(re)
        const iter1 = splitter(['aa', ' b ', 'cc'])
        assert.deepEqual(Array.from(iter1), ['aa', 'b', 'cc'])
      })
      it('should split (nothing to split)', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, ['absd'])
        assert.deepEqual(Array.from(iter), ['absd'])
      })
      it('should split (no iterables)', function () {
        const re = /\s+/g
        const iter = regexpSplitIter(re, [])
        assert.deepEqual(Array.from(iter), [])
      })
      it('should split with empty string', function () {
        const re = ''
        const iter = regexpSplitIter(re, ['ab', 'c'])
        assert.deepEqual(Array.from(iter), ['a', 'b', 'c'])
      })
      describe('includeMatch', () => {
        it('should split 1', function () {
          const re = /\s+/g
          const iter = regexpSplitIter(re, { includeMatch: true }, ['aa', 'b', 'cc'])
          assert.deepEqual(Array.from(iter), ['aabcc'])
        })
        it('should split 2', function () {
          const re = /\s+/g
          const iter = regexpSplitIter(re, { includeMatch: true }, ['aa', ' b ', 'cc'])
          assert.deepEqual(Array.from(iter), ['aa ', 'b ', 'cc'])
        })
        it('should split 3', function () {
          const re = /\s+/g
          const iter = regexpSplitIter(re, { includeMatch: true }, [' aa', ' b ', '    cc '])
          assert.deepEqual(Array.from(iter), [' ', 'aa ', 'b     ', 'cc '])
        })
        it('should split 4', function () {
          const re = /\s+/g
          const iter = regexpSplitIter(re, { includeMatch: true }, ['aa     ', '', ' b ', '    cc '])
          assert.deepEqual(Array.from(iter), ['aa      ', 'b    ', 'cc '])
        })
      })
    })
  })
})
