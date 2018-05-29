/* eslint-env node, mocha */
const assert = require('chai').assert
const asyncIterES5 = require('../dist/es5/async-iter')
const asyncIterES6 = require('../dist/async-iter')
const range = require('../dist/range')

const esversion = ['es5', 'es6']

describe('asyncIter', function () {
  [asyncIterES5, asyncIterES6].forEach(function (asyncIter, i) {
    describe(esversion[i], function () {
      it('transform sync iter to async', async function () {
        const iter = asyncIter(range({ start: 1, end: 4 }))
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 2, done: false })
        assert.deepEqual(await iter.next(), { value: 3, done: false })
        assert.deepEqual(await iter.next(), { value: undefined, done: true })
      })
    })
  })
})
