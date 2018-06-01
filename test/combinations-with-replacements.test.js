/* eslint-env node, mocha */
const assert = require('chai').assert
const combinationsWithReplacementES6 = require('../dist/es2018/combinations-with-replacement')
const combinationsWithReplacementES5 = require('../dist/es5/combinations-with-replacement')

const esversion = ['es6', 'es5']

describe('combinationsWithReplacement', function () {
  [combinationsWithReplacementES6, combinationsWithReplacementES5].forEach(function (combinationsWithReplacement, i) {
    describe(esversion[i], function () {
      it('returns empty', function () {
        const iter = combinationsWithReplacement([])
        assert.deepEqual(Array.from(iter), [])
      })

      it('returns combinationsWithReplacement', function () {
        const iter = combinationsWithReplacement([1, 2])
        assert.deepEqual(Array.from(iter), [[1, 1], [1, 2], [2, 2]])
      })

      it('returns combinationsWithReplacement (max n)', function () {
        const iter = combinationsWithReplacement([1, 2, 3, 4], 2)
        const expected = [
          [ 1, 1 ],
          [ 1, 2 ],
          [ 1, 3 ],
          [ 1, 4 ],
          [ 2, 2 ],
          [ 2, 3 ],
          [ 2, 4 ],
          [ 3, 3 ],
          [ 3, 4 ],
          [ 4, 4 ]]

        assert.deepEqual(Array.from(iter), expected)
      })
    })
  })
})
