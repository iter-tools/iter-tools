/* eslint-env node, mocha */
const asyncMapBatchES6 = require('../es2018/async-map-batch')
const asyncMapBatchES5 = require('../es5/async-map-batch')
const range = require('../es2018/range')
const asyncIterToArray = require('../es2018/async-iter-to-array')
const assert = require('chai').assert

const esversion = ['es6', 'es5']

function delay (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

async function slowSquare (item) {
  await delay(10)
  return item * item
}

describe('asyncMapBatch', function () {
  [asyncMapBatchES6, asyncMapBatchES5].forEach(function (asyncMapBatch, i) {
    describe(esversion[i], function () {
      it('runs 2 in parallel', async function () {
        const iter = asyncMapBatch(2, slowSquare, range(8))
        const t0 = Date.now()
        assert.deepEqual(await asyncIterToArray(iter), [0, 1, 4, 9, 16, 25, 36, 49])
        const t1 = Date.now()
        assert.isBelow(t1 - t0, 60)
      })
      it('runs 4 in parallel', async function () {
        const iter = asyncMapBatch(4, slowSquare, range(8))
        const t0 = Date.now()
        assert.deepEqual(await asyncIterToArray(iter), [0, 1, 4, 9, 16, 25, 36, 49])
        const t1 = Date.now()
        assert.isBelow(t1 - t0, 40)
      })
    })
  })
})
