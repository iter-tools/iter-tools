/* eslint-env node, mocha */
const assert = require('chai').assert
const teeES6 = require('../es2018/tee')
const teeES5 = require('../es5/tee')

const asyncIterToArray = require('../es2018/async-iter-to-array')
const asyncTeeES6 = require('../es2018/async-tee')
const asyncTeeES5 = require('../es5/async-tee')
const range = require('../es2018/range')

const esversion = ['es6', 'es5']

describe('tee', function () {
  [teeES6, teeES5].forEach(function (tee, i) {
    describe(esversion[i], function () {
      it('tee iterable', function () {
        const iters = tee(range(3), 3)
        assert.equal(iters.length, 3)
        assert.equal(iters[0].next().value, 0)
        assert.equal(iters[0].next().value, 1)

        assert.equal(iters[1].next().value, 0)
        assert.equal(iters[1].next().value, 1)
        assert.equal(iters[1].next().value, 2)
        assert.equal(iters[1].next().done, true)

        assert.equal(iters[0].next().value, 2)
        assert.equal(iters[0].next().done, true)

        assert.equal(iters[2].next().value, 0)
        assert.equal(iters[2].next().value, 1)
        assert.equal(iters[2].next().value, 2)
        assert.equal(iters[2].next().done, true)
      })
    })
  })
})

describe('tee', function () {
  [asyncTeeES6, asyncTeeES5].forEach(function (asyncTee, i) {
    describe(esversion[i], function () {
      it('tee iterable', async function () {
        const iters = asyncTee(range(3), 3)
        assert.equal(iters.length, 3)
        assert.equal((await iters[0].next()).value, 0)
        assert.equal((await iters[0].next()).value, 1)

        assert.equal((await iters[1].next()).value, 0)
        assert.equal((await iters[1].next()).value, 1)
        assert.equal((await iters[1].next()).value, 2)
        assert.equal((await iters[1].next()).done, true)

        assert.equal((await iters[0].next()).value, 2)
        assert.equal((await iters[0].next()).done, true)

        assert.equal((await iters[2].next()).value, 0)
        assert.equal((await iters[2].next()).value, 1)
        assert.equal((await iters[2].next()).value, 2)
        assert.equal((await iters[2].next()).done, true)
      })

      it('tee iterable', async function () {
        const iters = asyncTee([0, 1, 2], 3)

        assert.deepEqual(await asyncIterToArray(iters[0]), [0, 1, 2])
        assert.deepEqual(await asyncIterToArray(iters[1]), [0, 1, 2])
        assert.deepEqual(await asyncIterToArray(iters[2]), [0, 1, 2])
      })

      it('tee iterable async', function () {
        const iters = asyncTee([0, 1, 2], 2)
        const a = asyncIterToArray(iters[0])
          .then(arr => {
            assert.deepEqual(arr, [0, 1, 2])
          })

        const b = asyncIterToArray(iters[1])
          .then(arr => {
            assert.deepEqual(arr, [0, 1, 2])
          })

        return Promise.all([a, b])
      })
    })
  })
})
