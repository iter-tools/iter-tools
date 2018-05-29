/* eslint-env node, mocha */
const assert = require('chai').assert
const iterES6 = require('../dist/iter')
const iterES5 = require('../dist/es5/iter')
const range = require('../dist/range')

const esversion = ['es6', 'es5']

describe('iter', function () {
  [iterES6, iterES5].forEach(function (iter, i) {
    describe(esversion[i], function () {
      it('works with iterables', function () {
        const i = range(3)
        assert.equal(i, iter(i))
        assert.deepEqual(Array.from(iter(i)), [0, 1, 2])
      })
      it('works with generators', function () {
        const i = iter(range, 3)
        assert.deepEqual(Array.from(i), [0, 1, 2])
      })
      it('works with Symbol.iterator', function () {
        const i = iter([0, 1, 2])
        assert.deepEqual(Array.from(i), [0, 1, 2])
      })
      it('works with Objects', function () {
        const i = iter({'1': 1, '2': 2})
        assert.deepEqual(Array.from(i), [['1', 1], ['2', 2]])
      })
    })
  })
})
