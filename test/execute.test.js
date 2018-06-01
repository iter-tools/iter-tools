/* eslint-env node, mocha */
const assert = require('chai').assert
const executeES6 = require('../dist/es2018/execute')
const executeES5 = require('../dist/es5/execute')

const asyncExecuteES6 = require('../dist/es2018/async-execute')
const asyncExecuteES5 = require('../dist/es5/async-execute')
const esversion = ['es6', 'es5']

describe('execute', function () {
  [executeES6, executeES5].forEach(function (execute, i) {
    describe(esversion[i], function () {
      it('execute forever', function () {
        const iter = execute(function () { return 1 })
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 1)
        assert.equal(iter.next().value, 1)
      })
    })
  })
})

describe('asyncExecute', function () {
  [asyncExecuteES6, asyncExecuteES5].forEach(function (asyncExecute, i) {
    describe(esversion[i], function () {
      it('execute forever', async function () {
        const iter = asyncExecute(() => Promise.resolve(1))
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 1, done: false })
        assert.deepEqual(await iter.next(), { value: 1, done: false })
      })
    })
  })
})
