/* eslint-env node, mocha */
const assert = require('chai').assert
const groupbyES6 = require('../dist/es2018/group-by')
const groupbyES5 = require('../dist/es5/group-by')

const asyncGroupbyES6 = require('../dist/es2018/async-group-by')
const asyncGroupbyES5 = require('../dist/es5/async-group-by')
const asyncIterToArray = require('../dist/es2018/async-iter-to-array')

const esversion = ['es6', 'es5']

describe('groupby', function () {
  [groupbyES6, groupbyES5].forEach(function (groupby, i) {
    describe(esversion[i], function () {
      it('groupby main cursor', function () {
        const iter = groupby(null, 'AAABBAACCCCD')
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

      it('groupby main cursor (curried)', function () {
        const iter = groupby(null)('AAABBAACCCCD')
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
        const iter = groupby(null, 'AAABBAACCCCD')
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
        const iter = groupby(null, 'AAABBAACCCCD')
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

describe('asyncGroupby', function () {
  [asyncGroupbyES6, asyncGroupbyES5].forEach(function (asyncGroupby, i) {
    describe(esversion[i], function () {
      it('groupby main cursor', async function () {
        const iter = asyncGroupby(null, 'AAABBAACCCCD')
        let next
        next = await iter.next()
        assert.equal(next.value[0], 'A')
        next = await iter.next()
        assert.equal(next.value[0], 'B')
        next = await iter.next()
        assert.equal(next.value[0], 'A')
        next = await iter.next()
        assert.equal(next.value[0], 'C')
        next = await iter.next()
        assert.equal(next.value[0], 'D')
        next = await iter.next()
        assert.equal(next.done, true)
      })

      it('groupby main cursor (curried)', async function () {
        const iter = asyncGroupby(null)('AAABBAACCCCD')
        let next
        next = await iter.next()
        assert.equal(next.value[0], 'A')
        next = await iter.next()
        assert.equal(next.value[0], 'B')
        next = await iter.next()
        assert.equal(next.value[0], 'A')
        next = await iter.next()
        assert.equal(next.value[0], 'C')
        next = await iter.next()
        assert.equal(next.value[0], 'D')
        next = await iter.next()
        assert.equal(next.done, true)
      })

      it('groupby secondary', async function () {
        const iter = asyncGroupby(null, 'AAABBAACCCCD')
        let next
        next = await iter.next()
        assert.equal(next.value[0], 'A')
        assert.deepEqual(await asyncIterToArray(next.value[1]), ['A', 'A', 'A'])
        next = await iter.next()
        assert.equal(next.value[0], 'B')
        assert.deepEqual(await asyncIterToArray(next.value[1]), ['B', 'B'])
        next = await iter.next()
        assert.equal(next.value[0], 'A')
        assert.deepEqual(await asyncIterToArray(next.value[1]), ['A', 'A'])
        next = await iter.next()
        assert.equal(next.value[0], 'C')
        assert.deepEqual(await asyncIterToArray(next.value[1]), ['C', 'C', 'C', 'C'])
        next = await iter.next()
        assert.equal(next.value[0], 'D')
        assert.deepEqual(await asyncIterToArray(next.value[1]), ['D'])
        next = await iter.next()
        assert.equal(next.done, true)
      })

      it('groupby secondary (consume partially)', async function () {
        const iter = asyncGroupby(null, 'AAABBAACCCCD')
        let next
        next = await iter.next()
        assert.equal(next.value[0], 'A')
        assert.deepEqual((await next.value[1].next()).value, 'A')
        assert.deepEqual((await next.value[1].next()).value, 'A')
        assert.deepEqual((await next.value[1].next()).value, 'A')
        assert.deepEqual((await next.value[1].next()).done, true)
        next = await iter.next()
        assert.equal(next.value[0], 'B')
        // ...
      })
    })
  })
})
