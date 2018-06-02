/* eslint-env node, mocha */
const assert = require('chai').assert
const repeatES6 = require('../es2018/repeat')
const repeatES5 = require('../es5/repeat')

const esversion = ['es6', 'es5']

describe('repeat', function () {
  [repeatES6, repeatES5].forEach(function (repeat, i) {
    describe(esversion[i], function () {
      it('return simple repeat', function () {
        assert.deepEqual(Array.from(repeat(10, 3)), [10, 10, 10])
      })

      it('return infinite repeat', function () {
        const iter = repeat(10)
        assert.equal(iter.next().value, 10)
        assert.equal(iter.next().value, 10)
        assert.equal(iter.next().value, 10)
        assert.equal(iter.next().value, 10)
      })
    })
  })
})
