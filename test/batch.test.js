/* eslint-env node, mocha */
const batchES6 = require('../es2018/batch')
const batchES5 = require('../es5/batch')
const asyncBatchES6 = require('../es2018/async-batch')
const asyncBatchES5 = require('../es5/async-batch')
const range = require('../es2018/range')
const asyncIterToArray = require('../es2018/async-iter-to-array')
const assert = require('chai').assert

const esversion = ['es6', 'es5']

describe('batch', function () {
  [batchES6, batchES5].forEach(function (batch, i) {
    describe(esversion[i], function () {
      it('returns an iterable with batches', function () {
        const iter = batch(2, [1, 2, 3, 4, 5, 6, 7, 8, 9])
        assert.deepEqual(Array.from(iter), [[1, 2], [3, 4], [5, 6], [7, 8], [9]])
      })

      it('returns an iterable with batches when passed an iterable', function () {
        const iter = batch(2, range({ start: 1, end: 10 }))
        assert.deepEqual(Array.from(iter), [[1, 2], [3, 4], [5, 6], [7, 8], [9]])
      })

      it('returns an iterable with batches when passed an iterable (2)', function () {
        const iter = batch(2, range({ start: 1, end: 9 }))
        assert.deepEqual(Array.from(iter), [[1, 2], [3, 4], [5, 6], [7, 8]])
      })

      it('returns an iterable with batches (curried version)', function () {
        const iter = batch(2)
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 10 }))), [[1, 2], [3, 4], [5, 6], [7, 8], [9]])
      })
    })
  })
})

describe('asyncBatch', function () {
  [asyncBatchES6, asyncBatchES5].forEach(function (asyncBatch, i) {
    describe(esversion[i], function () {
      it('returns an async iterable with batches', async function () {
        const iter = asyncBatch(2, [1, 2, 3, 4, 5, 6, 7, 8, 9])
        assert.deepEqual(await asyncIterToArray(iter), [[1, 2], [3, 4], [5, 6], [7, 8], [9]])
      })

      it('returns an async iterable with batches when passed an iterable', async function () {
        const iter = asyncBatch(2, range({ start: 1, end: 10 }))
        assert.deepEqual(await asyncIterToArray(iter), [[1, 2], [3, 4], [5, 6], [7, 8], [9]])
      })

      it('returns an async iterable with batches when passed an iterable (2)', async function () {
        const iter = asyncBatch(2, range({ start: 1, end: 9 }))
        assert.deepEqual(await asyncIterToArray(iter), [[1, 2], [3, 4], [5, 6], [7, 8]])
      })

      it('returns an async iterable with batches (curried version)', async function () {
        const iter = asyncBatch(2)
        assert.deepEqual(await asyncIterToArray(iter(range({ start: 1, end: 10 }))), [[1, 2], [3, 4], [5, 6], [7, 8], [9]])
      })
    })
  })
})
