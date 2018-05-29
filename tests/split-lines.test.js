/* eslint-env node, mocha */
const assert = require('chai').assert
const splitLinesES6 = require('../dist/split-lines')
const splitLinesES5 = require('../dist/es5/split-lines')

const asyncSplitLinesES6 = require('../dist/async-split-lines')
const asyncSplitLinesES5 = require('../dist/es5/async-split-lines')
const asyncIterToArray = require('../dist/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('splitLines', function () {
  [splitLinesES6, splitLinesES5].forEach(function (splitLines, i) {
    describe(esversion[i], function () {
      it('should split 1', function () {
        const iter = splitLines(['aa', '\nb', 'cc'])
        assert.deepEqual(Array.from(iter), ['aa', 'bcc'])
      })
      it('should split 2', function () {
        const iter = splitLines(['aa\n', 'b ', 'cc\n'])
        assert.deepEqual(Array.from(iter), ['aa', 'b cc', ''])
      })
    })
  })
})

describe('asyncSplitLines', function () {
  [asyncSplitLinesES6, asyncSplitLinesES5].forEach(function (asyncSplitLines, i) {
    describe(esversion[i], function () {
      it('should split 1', async function () {
        const iter = asyncSplitLines(['aa', '\nb', 'cc'])
        assert.deepEqual(await asyncIterToArray(iter), ['aa', 'bcc'])
      })
      it('should split 2', async function () {
        const iter = asyncSplitLines(['aa\n', 'b ', 'cc\n'])
        assert.deepEqual(await asyncIterToArray(iter), ['aa', 'b cc', ''])
      })
    })
  })
})
