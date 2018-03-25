/* eslint-env node, mocha */
const assert = require('chai').assert
const executeES6 = require('../lib/execute')
const executeES5 = require('../es5/execute')

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
