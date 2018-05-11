/* eslint-env node, mocha */
const assert = require('chai').assert
const sliceES6 = require('../lib/slice')
const sliceES5 = require('../es5/slice')

const asyncSliceES6 = require('../lib/async/slice')
const asyncSliceES5 = require('../es5/async/slice')
const asyncIterToArray = require('../lib/async/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('slice', function () {
  [sliceES6, sliceES5].forEach(function (slice, i) {
    describe(esversion[i], function () {
      const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

      it('return simple slice', function () {
        assert.deepEqual(Array.from(slice(2, list)), [0, 1])
      })

      it('return simple slice with start/end', function () {
        assert.deepEqual(Array.from(slice({ start: 1, end: 4 }, list)), [1, 2, 3])
      })

      it('return simple slice with start/end/step', function () {
        assert.deepEqual(Array.from(slice({ start: 1, end: 6, step: 2 }, list)), [1, 3, 5])
      })

      it('return curried slice', function () {
        assert.deepEqual(Array.from(slice(2)(list)), [0, 1])
      })
    })
  })
})

describe('asyncSlice', function () {
  [asyncSliceES6, asyncSliceES5].forEach(function (asyncSlice, i) {
    describe(esversion[i], function () {
      const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

      it('return simple slice', async function () {
        assert.deepEqual(await asyncIterToArray(asyncSlice(2, list)), [0, 1])
      })

      it('return simple slice with start/end', async function () {
        assert.deepEqual(await asyncIterToArray(asyncSlice({ start: 1, end: 4 }, list)), [1, 2, 3])
      })

      it('return simple slice with start/end/step', async function () {
        assert.deepEqual(await asyncIterToArray(asyncSlice({ start: 1, end: 6, step: 2 }, list)), [1, 3, 5])
      })

      it('return curried slice', async function () {
        assert.deepEqual(await asyncIterToArray(asyncSlice(2)(list)), [0, 1])
      })
    })
  })
})
