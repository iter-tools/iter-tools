/* eslint-env node, mocha */
const assert = require('chai').assert
const dropWhileES6 = require('../dist/drop-while')
const dropWhileES5 = require('../dist/es5/drop-while')
const asyncDropWhileES6 = require('../dist/async-drop-while')
const asyncDropWhileES5 = require('../dist/es5/async-drop-while')
const range = require('../dist/range')
const asyncIterToArray = require('../dist/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('dropWhile', function () {
  [dropWhileES6, dropWhileES5].forEach(function (dropWhile, i) {
    describe(esversion[i], function () {
      it('dropWhile on array', function () {
        const iter = dropWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
        assert.deepEqual(Array.from(iter), [3, 2, 2, 2])
      })

      it('dropWhile on iterable', function () {
        const iter = dropWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
        assert.deepEqual(Array.from(iter), [4, 5, 6])
      })

      it('dropWhile on iterable (curried version)', function () {
        const iter = dropWhile(function (item) { return item !== 4 })
        assert.deepEqual(Array.from(iter(range({ start: 1, end: 7 }))), [4, 5, 6])
      })
    })
  })
})

describe('asyncDropWhile', function () {
  [asyncDropWhileES6, asyncDropWhileES5].forEach(function (asyncDropWhile, i) {
    describe(esversion[i], function () {
      it('dropWhile on array', async function () {
        const iter = asyncDropWhile(function (item) { return item % 2 === 0 }, [2, 2, 3, 2, 2, 2])
        assert.deepEqual(await asyncIterToArray(iter), [3, 2, 2, 2])
      })

      it('dropWhile on iterable', async function () {
        const iter = asyncDropWhile(function (item) { return item !== 4 }, range({ start: 1, end: 7 }))
        assert.deepEqual(await asyncIterToArray(iter), [4, 5, 6])
      })

      it('dropWhile on iterable (curried version)', async function () {
        const iter = asyncDropWhile(function (item) { return item !== 4 })
        assert.deepEqual(await asyncIterToArray(iter(range({ start: 1, end: 7 }))), [4, 5, 6])
      })
    })
  })
})
