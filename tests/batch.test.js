/* eslint-env node, mocha */
const assert = require('chai').assert
const batchES5 = require('../es5/async/batch')
const batchES6 = require('../lib/async/batch')
const asyncIter = require('../lib/async/async-iter')
const range = require('../lib/range')

const esversion = ['es5', 'es6']

describe('batch', function () {
  [batchES5, batchES6].forEach(function (batch, i) {
    describe(esversion[i], function () {
      it('transform sync iter to async', async function () {
        const iter = asyncIter(range({ start: 1, end: 5 }))
        const batchIter = batch(iter, 2)
        assert.deepEqual(await batchIter.next(), { value: 1, done: false })
        assert.deepEqual(await batchIter.next(), { value: 2, done: false })
        assert.deepEqual(await batchIter.next(), { value: 3, done: false })
        assert.deepEqual(await batchIter.next(), { value: 4, done: false })
        assert.deepEqual(await batchIter.next(), { value: undefined, done: true })
      })
    })
  })
})
