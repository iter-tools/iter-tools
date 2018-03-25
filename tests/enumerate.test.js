/* eslint-env node, mocha */
const assert = require('chai').assert
const enumerateES6 = require('../lib/enumerate')
const enumerateES5 = require('../es5/enumerate')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('enumerate', function () {
  [enumerateES6, enumerateES5].forEach(function (enumerate, i) {
    describe(esversion[i], function () {
      it('enumerates iterables', function () {
        const iter = enumerate(range({ start: 1, end: 4 }))
        assert.deepEqual(Array.from(iter), [[0, 1], [1, 2], [2, 3]])
      })
      it('enumerates iterables with start', function () {
        const iter = enumerate(range({ start: 1, end: 4 }), 3)
        assert.deepEqual(Array.from(iter), [[3, 1], [4, 2], [5, 3]])
      })
    })
  })
})
