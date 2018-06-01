/* eslint-env node, mocha */
const assert = require('chai').assert
const permutationsES6 = require('../dist/es2018/permutations')
const permutationsES5 = require('../dist/es5/permutations')

const esversion = ['es6', 'es5']

describe('permutations', function () {
  [permutationsES6, permutationsES5].forEach(function (permutations, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        const iter = permutations([])
        assert.deepEqual(Array.from(iter), [])
      })

      it('returns permutations', function () {
        const iter = permutations([1, 2])
        assert.deepEqual(Array.from(iter), [[1, 2], [2, 1]])
      })

      it('returns permutations', function () {
        const iter = permutations([1, 2, 3, 4], 2)
        const expected = [ [ 1, 2 ],
          [ 1, 3 ],
          [ 1, 4 ],
          [ 2, 1 ],
          [ 2, 3 ],
          [ 2, 4 ],
          [ 3, 1 ],
          [ 3, 2 ],
          [ 3, 4 ],
          [ 4, 1 ],
          [ 4, 2 ],
          [ 4, 3 ] ]

        assert.deepEqual(Array.from(iter), expected)
      })
    })
  })
})
