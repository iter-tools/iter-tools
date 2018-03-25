/* eslint-env node, mocha */
const assert = require('chai').assert
const compressES6 = require('../lib/compress')
const compressES5 = require('../es5/compress')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('compress', function () {
  [compressES6, compressES5].forEach(function (compress, i) {
    describe(esversion[i], function () {
      it('compresss iterables', function () {
        const iter = compress(range(10), [0, 1, 0, 1, 1])
        assert.deepEqual(Array.from(iter), [1, 3, 4])
      })
    })
  })
})
