/* eslint-env node, mocha */
const assert = require('chai').assert
const groupbyES6 = require('../lib/groupby')
const groupbyES5 = require('../es5/groupby')

const esversion = ['es6', 'es5']

describe('groupby', function () {
  [groupbyES6, groupbyES5].forEach(function (groupby, i) {
    describe(esversion[i], function () {
      it('groupby main cursor', function () {
        const iter = groupby('AAABBAACCCCD')
        let next
        next = iter.next()
        assert.equal(next.value[0], 'A')
        next = iter.next()
        assert.equal(next.value[0], 'B')
        next = iter.next()
        assert.equal(next.value[0], 'A')
        next = iter.next()
        assert.equal(next.value[0], 'C')
        next = iter.next()
        assert.equal(next.value[0], 'D')
        next = iter.next()
        assert.equal(next.done, true)
      })

      it('groupby secondary', function () {
        const iter = groupby('AAABBAACCCCD')
        let next
        next = iter.next()
        assert.equal(next.value[0], 'A')
        assert.deepEqual(Array.from(next.value[1]), ['A', 'A', 'A'])
        next = iter.next()
        assert.equal(next.value[0], 'B')
        assert.deepEqual(Array.from(next.value[1]), ['B', 'B'])
        next = iter.next()
        assert.equal(next.value[0], 'A')
        assert.deepEqual(Array.from(next.value[1]), ['A', 'A'])
        next = iter.next()
        assert.equal(next.value[0], 'C')
        assert.deepEqual(Array.from(next.value[1]), ['C', 'C', 'C', 'C'])
        next = iter.next()
        assert.equal(next.value[0], 'D')
        assert.deepEqual(Array.from(next.value[1]), ['D'])
        next = iter.next()
        assert.equal(next.done, true)
      })

      it('groupby secondary (consume partially)', function () {
        const iter = groupby('AAABBAACCCCD')
        let next
        next = iter.next()
        assert.equal(next.value[0], 'A')
        assert.deepEqual(next.value[1].next().value, 'A')
        assert.deepEqual(next.value[1].next().value, 'A')
        assert.deepEqual(next.value[1].next().value, 'A')
        assert.deepEqual(next.value[1].next().done, true)
        next = iter.next()
        assert.equal(next.value[0], 'B')
        // ...
      })
    })
  })
})
