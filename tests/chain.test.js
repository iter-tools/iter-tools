/* eslint-env node, mocha */
const assert = require('chai').assert
const chainES6 = require('../lib/chain')
const chainES5 = require('../es5/chain')
const asyncChainES6 = require('../lib/async-chain')
const asyncChainES5 = require('../es5/async-chain')
const asyncIterToArray = require('../es5/async-iter-to-array')
const range = require('../lib/range')

const esversion = ['es6', 'es5']

describe('chain', function () {
  [chainES6, chainES5].forEach(function (chain, i) {
    describe(esversion[i], function () {
      it('chains iterables', function () {
        const iter = chain(range({ start: 1, end: 4 }), [4, 5, 6])
        assert.deepEqual(Array.from(iter), [1, 2, 3, 4, 5, 6])
      })
    })
  })
})

describe('asyncChain', function () {
  [asyncChainES5, asyncChainES6].forEach(function (chain, i) {
    describe('es5', function () {
      it('chains iterables', async function () {
        const iter = chain(range({ start: 1, end: 3 }), [3, 4])
        assert.deepEqual(await asyncIterToArray(iter), [1, 2, 3, 4])
      })
    })
  })
})
