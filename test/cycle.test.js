/* eslint-env node, mocha */
const assert = require('chai').assert
const cycleES6 = require('../dist/es2018/cycle')
const cycleES5 = require('../dist/es5/cycle')
const asyncCycleES6 = require('../dist/es2018/async-cycle')
const asyncCycleES5 = require('../dist/es5/async-cycle')

const esversion = ['es6', 'es5']
const range = require('../dist/es2018/range')

describe('cycle', function () {
  [cycleES6, cycleES5].forEach(function (cycle, i) {
    describe(esversion[i], function () {
      it('return infinite cycle', function () {
        const iter = cycle([1, 2, 3])
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 3)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 3)
        assert.equal(iter.next().value, 1)
      })

      it('return infinite cycle (from iterator)', function () {
        const iter = cycle(range(3))
        assert.equal(iter.next().value, 0)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 0)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 0)
      })
    })
  })
})

describe('asyncCycle', function () {
  [asyncCycleES6, asyncCycleES5].forEach(function (asyncCycle, i) {
    describe(esversion[i], function () {
      it('return infinite cycle', async function () {
        const iter = asyncCycle([1, 2, 3])
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 2, done: false })
        assert.deepEqual(await iter.next(), { value: 3, done: false })
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 2, done: false })
        assert.deepEqual(await iter.next(), { value: 3, done: false })
      })

      it('return infinite cycle (from iterator)', async function () {
        const iter = asyncCycle(range(3))
        assert.deepEqual(await iter.next(), { value: 0, done: false })
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 2, done: false })
        assert.deepEqual(await iter.next(), { value: 0, done: false })
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 2, done: false })
      })
    })
  })
})
