/* eslint-env node, mocha */
const assert = require('chai').assert
const zipES6 = require('../lib/zip')
const zipES5 = require('../es5/zip')

const asyncZipES6 = require('../lib/async/zip')
const asyncZipES5 = require('../es5/async/zip')
const asyncIterToArray = require('../lib/async/async-iter-to-array')

const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('zip', function () {
  [zipES6, zipES5].forEach(function (zip, i) {
    describe(esversion[i], function () {
      it('zips', function () {
        const iter = zip([1, 2, 3], [4, 5, 6], [7, 8, 9])
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zips using iterables', function () {
        const iter = zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zips stopping early', function () {
        const iter = zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8])
        assert.deepEqual(Array.from(iter), [[1, 4, 7], [2, 5, 8]])
      })
    })
  })
})

describe('asyncZip', function () {
  [asyncZipES6, asyncZipES5].forEach(function (asyncZip, i) {
    describe(esversion[i], function () {
      it('zips', async function () {
        const iter = asyncZip([1, 2, 3], [4, 5, 6], [7, 8, 9])
        assert.deepEqual(await asyncIterToArray(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zips using iterables', async function () {
        const iter = asyncZip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
        assert.deepEqual(await asyncIterToArray(iter), [[1, 4, 7], [2, 5, 8], [3, 6, 9]])
      })

      it('zips stopping early', async function () {
        const iter = asyncZip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8])
        assert.deepEqual(await asyncIterToArray(iter), [[1, 4, 7], [2, 5, 8]])
      })
    })
  })
})
