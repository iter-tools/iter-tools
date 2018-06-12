/* eslint-env node, mocha */
const consumeES6 = require('../es2018/consume')
const consumeES5 = require('../es5/consume')
const asyncconsumeES6 = require('../es2018/async-consume')
const asyncconsumeES5 = require('../es5/async-consume')
const range = require('../es2018/range')
const asyncIterToArray = require('../es2018/async-iter-to-array')
const assert = require('chai').assert

const esversion = ['es6', 'es5']

describe('consume', function () {
  [consumeES6, consumeES5].forEach(function (consume, i) {
    describe(esversion[i], function () {
      it('consume an iterable', function () {
        const arr = []
        const iter = consume((item) => arr.push(item), [1, 2, 3])
        assert.deepEqual(arr, [1, 2, 3])
      })
      it('consume an iterable (curried)', function () {
        const arr = []
        const consumePush = consume((item) => arr.push(item))
        consumePush([1, 2, 3])
        assert.deepEqual(arr, [1, 2, 3])
      })
    })
  })
})

describe('asyncconsume', function () {
  [asyncconsumeES6, asyncconsumeES5].forEach(function (asyncConsume, i) {
    describe(esversion[i], function () {
      it('consume an iterable', async function () {
        const arr = []
        const iter = await asyncConsume((item) => arr.push(item), [1, 2, 3])
        assert.deepEqual(arr, [1, 2, 3])
      })
      it('consume an iterable (curried)', async function () {
        const arr = []
        const consumePush = asyncConsume((item) => arr.push(item))
        await consumePush([1, 2, 3])
        assert.deepEqual(arr, [1, 2, 3])
      })
    })
  })
})
