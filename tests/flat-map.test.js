/* eslint-env node, mocha */
const assert = require('chai').assert
const flatMapES6 = require('../dist/flat-map')
const flatMapES5 = require('../dist/es5/flat-map')

const asyncFlatMapES6 = require('../dist/async-flat-map')
const asyncFlatMapES5 = require('../dist/es5/async-flat-map')
const range = require('../dist/range')
const asyncIterToArray = require('../dist/async-iter-to-array')

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

describe('asyncFlatMap', function () {
  [asyncFlatMapES6, asyncFlatMapES5].forEach(function (asyncFlatMap, i) {
    describe(esversion[i], function () {
      it('return flatMapped iterable', async function () {
        const iter = asyncFlatMap(function (item) { return [item, item * 2] }, [1, 2, 3])
        assert.deepEqual(await asyncIterToArray(iter), [1, 2, 2, 4, 3, 6])
      })

      it('return flatMapped iterable from iterable', async function () {
        const iter = asyncFlatMap(function (item) { return [item, item * 2] }, range({ start: 1, end: 4 }))
        assert.deepEqual(await asyncIterToArray(iter), [1, 2, 2, 4, 3, 6])
      })

      it('return flatMapped iterable (curried version)', async function () {
        const iter = asyncFlatMap(function (item) { return [item, item * 2] })
        assert.deepEqual(await asyncIterToArray(iter(range({ start: 1, end: 4 }))), [1, 2, 2, 4, 3, 6])
      })
    })
  })
})
