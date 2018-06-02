/* eslint-env node, mocha */
const assert = require('chai').assert
const reduceES6 = require('../es2018/reduce')
const reduceES5 = require('../es5/reduce')

const asyncReduceES6 = require('../es2018/async-reduce')
const asyncReduceES5 = require('../es5/async-reduce')
const range = require('../es2018/range')

const esversion = ['es6', 'es5']

describe('reduce', function () {
  [reduceES6, reduceES5].forEach(function (reduce, i) {
    describe(esversion[i], function () {
      it('sums an array', function () {
        const sum = reduce(function (acc = 0, x) {
          return acc + x
        }, [0, 1, 2, 3])
        assert.equal(sum, 6)
      })

      it('sums a range', function () {
        const sum = reduce(function (acc = 0, x) {
          return acc + x
        }, range(4))
        assert.equal(sum, 6)
      })

      it('sums a range (using curry)', function () {
        const sum = reduce(function (acc = 0, x) {
          return acc + x
        })
        assert.equal(sum(range(4)), 6)
      })
    })
  })
})

describe('asyncReduce', function () {
  [asyncReduceES6, asyncReduceES5].forEach(function (asyncReduce, i) {
    describe(esversion[i], function () {
      it('sums an array', async function () {
        const sum = await asyncReduce(function (acc = 0, x) {
          return acc + x
        }, [0, 1, 2, 3])
        assert.equal(sum, 6)
      })

      it('sums a range', async function () {
        const sum = await asyncReduce(function (acc = 0, x) {
          return acc + x
        }, range(4))
        assert.equal(sum, 6)
      })

      it('sums a range (using curry)', async function () {
        const sum = asyncReduce(function (acc = 0, x) {
          return acc + x
        })
        assert.equal(await sum(range(4)), 6)
      })
    })
  })
})
