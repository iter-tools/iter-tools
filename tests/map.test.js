/* eslint-env node, mocha */
const assert = require('chai').assert
const mapES6 = require('../lib/map')
const mapES5 = require('../es5/map')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('map', function () {
  [mapES6, mapES5].forEach(function (map, i) {
    describe(esversion[i], function () {
      it('return mapped iterable', function () {
        const iter = map(function (item) { return item * 2 }, [1, 2, 3])
        assert.deepEqual(Array.from(iter), [2, 4, 6])
      })

      it('return mapped iterable from iterable', function () {
        const iter = map(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
        assert.deepEqual(Array.from(iter), [2, 4, 6])
      })

      it('return mapped iterable (curried version)', function () {
        const iter = map(function (item) { return item * 2 })
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 4 }))), [2, 4, 6])
      })
    })
  })
})
