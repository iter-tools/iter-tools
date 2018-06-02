/* eslint-env node, mocha */
const assert = require('chai').assert
const zipLongestES6 = require('../es2018/zip-longest')
const zipLongestES5 = require('../es5/zip-longest')

const asyncZipLongestES6 = require('../es2018/async-zip-longest')
const asyncZipLongestES5 = require('../es5/async-zip-longest')
const asyncIterToArray = require('../es2018/async-iter-to-array')
const range = require('../es2018/range')

const esversion = ['es6', 'es5']

describe('zipLongest', function () {
  [zipLongestES6, zipLongestES5].forEach(function (zipLongest, i) {
    describe(esversion[i], function () {
      it('zips', function () {
        const iter = zipLongest('x', [1, 2, 3], [4, 5, 6], [7, 8, 9])
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zips using iterables', function () {
        const iter = zipLongest('x', range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zip stopping early', function () {
        const iter = zipLongest('x', range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8])
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 'x', 'x']])
      })
    })
  })
})

describe('asyncZipLongest', function () {
  [asyncZipLongestES6, asyncZipLongestES5].forEach(function (asyncZipLongest, i) {
    describe(esversion[i], function () {
      it('zips', async function () {
        const iter = asyncZipLongest('x', [1, 2, 3], [4, 5, 6], [7, 8, 9])
        assert.deepEqual(await asyncIterToArray(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zips using iterables', async function () {
        const iter = asyncZipLongest('x', range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
        assert.deepEqual(await asyncIterToArray(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zip stopping early', async function () {
        const iter = asyncZipLongest('x', range({ start: 1, end: 4 }), range({ start: 4, end: 6 }), [7, 8])
        assert.deepEqual(await asyncIterToArray(iter), [[1, 4, 7], [2, 5, 8], [3, 'x', 'x']])
      })
    })
  })
})
