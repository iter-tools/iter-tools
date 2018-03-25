/* eslint-env node, mocha */
const assert = require('chai').assert
const filterES6 = require('../lib/filter')
const filterES5 = require('../es5/filter')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('filter', function () {
  [filterES6, filterES5].forEach(function (filter, i) {
    describe(esversion[i], function () {
      it('return filtered iterable', function () {
        const iter = filter(function (item) { return item % 2 === 0 }, [1, 2, 3, 4, 5, 6])
        assert.deepEqual(Array.from(iter), [2, 4, 6])
      })

      it('return filtered iterable from iterable', function () {
        const iter = filter(function (item) { return item % 2 === 0 }, range({ start: 1, end: 7 }))
        assert.deepEqual(Array.from(iter), [2, 4, 6])
      })

      it('return filtered iterable (curried version)', function () {
        const iter = filter(function (item) { return item % 2 === 0 })
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 7 }))), [2, 4, 6])
      })
    })
  })
})
