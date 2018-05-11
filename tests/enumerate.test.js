/* eslint-env node, mocha */
const assert = require('chai').assert
const enumerateES6 = require('../lib/enumerate')
const enumerateES5 = require('../es5/enumerate')

const asyncEnumerateES6 = require('../lib/async/enumerate')
const asyncEnumerateES5 = require('../es5/async/enumerate')
const range = require('../lib/range')
const asyncIterToArray = require('../lib/async/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('enumerate', function () {
  [enumerateES6, enumerateES5].forEach(function (enumerate, i) {
    describe(esversion[i], function () {
      it('enumerates iterables', function () {
        const iter = enumerate(range({ start: 1, end: 4 }))
        assert.deepEqual(Array.from(iter), [[0, 1], [1, 2], [2, 3]])
      })
      it('enumerates iterables with start', function () {
        const iter = enumerate(range({ start: 1, end: 4 }), 3)
        assert.deepEqual(Array.from(iter), [[3, 1], [4, 2], [5, 3]])
      })
    })
  })
})

describe('asyncEnumerate', function () {
  [asyncEnumerateES6, asyncEnumerateES5].forEach(function (asyncEnumerate, i) {
    describe(esversion[i], function () {
      it('enumerates iterables', async function () {
        const iter = asyncEnumerate(range({ start: 1, end: 4 }))
        assert.deepEqual(await asyncIterToArray(iter), [[0, 1], [1, 2], [2, 3]])
      })
      it('enumerates iterables with start', async function () {
        const iter = asyncEnumerate(range({ start: 1, end: 4 }), 3)
        assert.deepEqual(await asyncIterToArray(iter), [[3, 1], [4, 2], [5, 3]])
      })
    })
  })
})
