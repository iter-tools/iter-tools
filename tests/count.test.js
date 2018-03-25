/* eslint-env node, mocha */
const assert = require('chai').assert
const countES6 = require('../lib/count')
const countES5 = require('../es5/count')

const esversion = ['es6', 'es5']

describe('count', function () {
  [countES6, countES5].forEach(function (count, i) {
    describe(esversion[i], function () {
      it('return infinite count', function () {
        const iter = count({ start: 10 })
        assert.equal(iter.next().value, 10)
        assert.equal(iter.next().value, 11)
        assert.equal(iter.next().value, 12)
      })

      it('return infinite count with step', function () {
        const iter = count({start: 10, step: 5})
        assert.equal(iter.next().value, 10)
        assert.equal(iter.next().value, 15)
        assert.equal(iter.next().value, 20)
        assert.equal(iter.next().value, 25)
      })
    })
  })
})
