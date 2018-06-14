/* eslint-env node, mocha */
const assert = require('chai').assert
const keysES6 = require('../es2018/keys')
const keysES5 = require('../es5/keys')
const range = require('../es2018/range')

const esversion = ['es6', 'es5']

describe('keys', function () {
  [keysES6, keysES5].forEach(function (keys, i) {
    describe(esversion[i], function () {
      it('works with Map', function () {
        const map = new Map([['foo', 'bar'], ['fox', 'far']])
        assert.deepEqual(Array.from(keys(map)), Array.from(map.keys()))
      })
      it('works with Objects', function () {
        const i = keys({'1': 1, '2': 2})
        assert.deepEqual(Array.from(i), ['1', '2'])
      })
      it('works with null', function() {
        const i = keys(null)
        assert.deepEqual(Array.from(i), [])
      })
    })
  })
})
