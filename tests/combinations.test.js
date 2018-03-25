/* eslint-env node, mocha */
const assert = require('chai').assert
const combinationsES6 = require('../lib/combinations')
const combinationsES5 = require('../es5/combinations')

const esversion = ['es6', 'es5']

describe('combinations', function () {
  [combinationsES6, combinationsES5].forEach(function (combinations, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        const iter = combinations([])
        assert.deepEqual(Array.from(iter), [])
      })

      it('returns combinations', function () {
        const iter = combinations([1, 2])
        assert.deepEqual(Array.from(iter), [[1, 2]])
      })

      it('returns combinations (max n)', function () {
        const iter = combinations([1, 2, 3, 4], 2)
        const expected = [ [ 1, 2 ],
          [ 1, 3 ],
          [ 1, 4 ],
          [ 2, 3 ],
          [ 2, 4 ],
          [ 3, 4 ]]

        assert.deepEqual(Array.from(iter), expected)
      })

      it('returns combinations 0', function () {
        const iter = combinations([1, 2, 3, 4], 0)
        const expected = []

        assert.deepEqual(Array.from(iter), expected)
      })
    })
  })
})
