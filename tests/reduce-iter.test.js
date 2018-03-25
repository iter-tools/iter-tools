/* eslint-env node, mocha */
const assert = require('chai').assert
const reduceIterES6 = require('../lib/reduce-iter')
const reduceIterES5 = require('../es5/reduce-iter')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('reduce-iter', function () {
  [reduceIterES6, reduceIterES5].forEach(function (reduceIter, i) {
    describe(esversion[i], function () {
      it('sums an array', function () {
        const seq = reduceIter(function (acc, x) {
          return acc + x
        }, 0, [0, 1, 2, 3])
        assert.deepEqual(Array.from(seq), [0, 1, 3, 6])
      })

      it('sums a range', function () {
        const seq = reduceIter(function (acc, x) {
          return acc + x
        }, 0, range(4))
        assert.deepEqual(Array.from(seq), [0, 1, 3, 6])
      })
    })
  })
})
