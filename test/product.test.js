/* eslint-env node, mocha */
const assert = require('chai').assert
const productES6 = require('../es2018/product')
const productES5 = require('../es5/product')
const tee = require('../es2018/tee')

const esversion = ['es6', 'es5']

describe('product', function () {
  [productES6, productES5].forEach(function (product, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        const iter = product()
        assert.deepEqual(Array.from(iter), [])
      })

      it('returns single', function () {
        const iter = product([1, 2, 3])
        assert.deepEqual(Array.from(iter), [[1], [2], [3]])
      })

      it('returns double', function () {
        const iter = product([1, 2], [3, 4])
        assert.deepEqual(Array.from(iter), [[1, 3], [1, 4], [2, 3], [2, 4]])
      })

      it('returns with repeat', function () {
        const iter = product(...tee([1, 2], 2))
        assert.deepEqual(Array.from(iter), [[1, 1], [1, 2], [2, 1], [2, 2]])
      })

      it('returns triple', function () {
        const iter = product([1, 2], [3, 4], [5, 6])
        assert.deepEqual(Array.from(iter), [
          [1, 3, 5],
          [1, 3, 6],
          [1, 4, 5],
          [1, 4, 6],
          [2, 3, 5],
          [2, 3, 6],
          [2, 4, 5],
          [2, 4, 6]
        ])
      })
    })
  })
})
