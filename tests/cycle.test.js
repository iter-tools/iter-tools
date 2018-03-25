/* eslint-env node, mocha */
const assert = require('chai').assert
const cycleES6 = require('../lib/cycle')
const cycleES5 = require('../es5/cycle')

const esversion = ['es6', 'es5']
const range = require('../lib/range')
describe('cycle', function () {
  [cycleES6, cycleES5].forEach(function (cycle, i) {
    describe(esversion[i], function () {
      it('return infinite cycle', function () {
        const iter = cycle([1, 2, 3])
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 3)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 3)
        assert.equal(iter.next().value, 1)
      })

      it('return infinite cycle (from iterator)', function () {
        const iter = cycle(range(3))
        assert.equal(iter.next().value, 0)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 0)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 2)
        assert.equal(iter.next().value, 0)
      })
    })
  })
})
