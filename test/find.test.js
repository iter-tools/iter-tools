/* eslint-env node, mocha */
const assert = require('chai').assert
const findES6 = require('../es2018/find')
const findES5 = require('../es5/find')

const asyncFindES6 = require('../es2018/async-find')
const asyncFindES5 = require('../es5/async-find')

const range = require('../es2018/range')
const asyncIterToArray = require('../es2018/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('find', function () {
  [findES5, findES6].forEach(function (find, i) {
    describe(esversion[i], function () {
      it('return found item', function () {
        const found = find(function (item) { return item === 5 }, [1, 2, 3, 4, 5, 6])
        assert.equal(found, 5)
      });

      it('return null if no item found', function () {
        const found = find(function (item) { return item === 100 }, [1, 2, 3, 4, 5, 6])
        assert.equal(found, null)
      });

      it('return found item from iterable', function () {
        const found = find(function (item) { return item === 5 }, range({ start: 1, end: 7 }))
        assert.equal(found, 5)
      })

      it('return null if no item found from iterable', function () {
        const found = find(function (item) { return item === 100 }, range({ start: 1, end: 7 }))
        assert.equal(found, null)
      })

      it('return filtered iterable (curried version)', function () {
        const findFive = find(function (item) { return item === 5 })
        assert.equal(findFive(range({ start: 1, end: 7 })), 5)
      })
    })
  })
})

describe('asyncFind', function () {
  [asyncFindES6, asyncFindES5].forEach(function (asyncFind, i) {
    describe(esversion[i], function () {
      it('return found item', async function () {
        const found = asyncFind(function (item) { return item === 5 }, [1, 2, 3, 4, 5, 6])
        assert.equal(await found, 5)
      });

      it('return null if no item found', async function () {
        const found = asyncFind(function (item) { return item === 100 }, [1, 2, 3, 4, 5, 6])
        assert.equal(await found, null)
      });

      it('return found item from iterable', async function () {
        const found = asyncFind(function (item) { return item === 5 }, range({ start: 1, end: 7 }))
        assert.equal(await found, 5)
      })

      it('return null if no item found from iterable', async function () {
        const found = asyncFind(function (item) { return item === 100 }, range({ start: 1, end: 7 }))
        assert.equal(await found, null)
      })

      it('return filtered iterable (curried version)', async function () {
        const findFive = asyncFind(function (item) { return item === 5 })
        assert.equal(await findFive(range({ start: 1, end: 7 })), 5)
      })
    })
  })
})
