/* eslint-env node, mocha */
const assert = require('chai').assert
const flatMapES6 = require('../lib/flat-map')
const flatMapES5 = require('../es5/flat-map')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('flatMap', function () {
  [flatMapES6, flatMapES5].forEach(function (flatMap, i) {
    describe(esversion[i], function () {
      it('return flatMapped iterable', function () {
        const iter = flatMap(function (item) { return [item, item * 2] }, [1, 2, 3])
        assert.deepEqual(Array.from(iter), [1, 2, 2, 4, 3, 6])
      })

      it('return flatMapped iterable from iterable', function () {
        const iter = flatMap(function (item) { return [item, item * 2] }, range({ start: 1, end: 4 }))
        assert.deepEqual(Array.from(iter), [1, 2, 2, 4, 3, 6])
      })

      it('return flatMapped iterable (curried version)', function () {
        const iter = flatMap(function (item) { return [item, item * 2] })
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 4 }))), [1, 2, 2, 4, 3, 6])
      })
    })
  })
})
