/* eslint-env node, mocha */
const assert = require('chai').assert
const reduceES6 = require('../lib/reduce')
const reduceES5 = require('../es5/reduce')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('reduce', function () {
  [reduceES6, reduceES5].forEach(function (reduce, i) {
    describe(esversion[i], function () {
      it('sums an array', function () {
        const sum = reduce([0, 1, 2, 3], function (acc, x) {
          return acc + x
        }, 0)
        assert.equal(sum, 6)
      })

      it('sums a range', function () {
        const sum = reduce(range(4), function (acc, x) {
          return acc + x
        }, 0)
        assert.equal(sum, 6)
      })
    })
  })
})
