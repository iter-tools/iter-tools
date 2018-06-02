/* eslint-env node, mocha */
const assert = require('chai').assert
const compressES6 = require('../es2018/compress')
const compressES5 = require('../es5/compress')
const compressAsyncES6 = require('../es2018/async-compress')
const compressAsyncES5 = require('../es5/async-compress')
const range = require('../es2018/range')
const asyncIter = require('../es2018/async-iter')
const asyncIterToArray = require('../es2018/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('compress', function () {
  [compressES6, compressES5].forEach(function (compress, i) {
    describe(esversion[i], function () {
      it('compress iterables', function () {
        const iter = compress(range(10), [0, 1, 0, 1, 1])
        assert.deepEqual(Array.from(iter), [1, 3, 4])
      })
    })
  })
})

describe('compressAsync', function () {
  [compressAsyncES6, compressAsyncES5].forEach(function (compressAsync, i) {
    describe(esversion[i], function () {
      it('compress iterables', async function () {
        const iter = compressAsync(asyncIter(range(10)), [0, 1, 0, 1, 1])
        assert.deepEqual(await asyncIterToArray(iter), [1, 3, 4])
      })
    })
  })
})
