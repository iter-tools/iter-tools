/* eslint-env node, mocha */
const assert = require('chai').assert
const mapES6 = require('../lib/map')
const mapES5 = require('../es5/map')
const range = require('../lib/range')

const asyncMapES6 = require('../lib/async-map')
const asyncMapES5 = require('../es5/async-map')
const asyncIterToArray = require('../lib/async-iter-to-array')

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

describe('asyncMap', function () {
  [asyncMapES6, asyncMapES5].forEach(function (asyncMap, i) {
    describe(esversion[i], function () {
      it('return mapped iterable', async function () {
        const iter = asyncMap(function (item) { return item * 2 }, [1, 2, 3])
        assert.deepEqual(await asyncIterToArray(iter), [2, 4, 6])
      })

      it('return mapped iterable from iterable', async function () {
        const iter = asyncMap(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
        assert.deepEqual(await asyncIterToArray(iter), [2, 4, 6])
      })

      it('return mapped iterable (curried version)', async function () {
        const iter = asyncMap(function (item) { return item * 2 })
        assert.deepEqual(await asyncIterToArray(iter(range({ start: 1, end: 4 }))), [2, 4, 6])
      })
    })
  })
})
