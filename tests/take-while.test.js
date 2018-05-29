/* eslint-env node, mocha */
const assert = require('chai').assert
const takeWhileES6 = require('../dist/take-while')
const takeWhileES5 = require('../dist/es5/take-while')
const range = require('../dist/range')

const asyncTakeWhileES6 = require('../dist/async-take-while')
const asyncTakeWhileES5 = require('../dist/es5/async-take-while')
const asyncIterToArray = require('../dist/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('takeWhile', function () {
  [takeWhileES6, takeWhileES5].forEach(function (takeWhile, i) {
    describe(esversion[i], function () {
      it('takeWhile on array', function () {
        const iter = takeWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
        assert.deepEqual(Array.from(iter), [2, 2])
      })

      it('takeWhile on iterable', function () {
        const iter = takeWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
        assert.deepEqual(Array.from(iter), [1, 2, 3])
      })

      it('takeWhile on iterable (curried version)', function () {
        const iter = takeWhile(function (item) { return item !== 4 })
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 7 }))), [1, 2, 3])
      })
    })
  })
})

describe('asyncTakeWhile', function () {
  [asyncTakeWhileES6, asyncTakeWhileES5].forEach(function (asyncTakeWhile, i) {
    describe(esversion[i], function () {
      it('takeWhile on array', async function () {
        const iter = asyncTakeWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
        assert.deepEqual(await asyncIterToArray(iter), [2, 2])
      })

      it('takeWhile on iterable', async function () {
        const iter = asyncTakeWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
        assert.deepEqual(await asyncIterToArray(iter), [1, 2, 3])
      })

      it('takeWhile on iterable (curried version)', async function () {
        const iter = asyncTakeWhile(function (item) { return item !== 4 })
        assert.deepEqual(await asyncIterToArray(iter(range({ start: 1, end: 7 }))), [1, 2, 3])
      })
    })
  })
})
