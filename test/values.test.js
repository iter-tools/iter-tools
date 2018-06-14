/* eslint-env node, mocha */
const assert = require('chai').assert
const valuesES6 = require('../es2018/values')
const valuesES5 = require('../es5/values')
const range = require('../es2018/range')

const esversion = ['es6', 'es5']

describe('values', function () {
  [valuesES6, valuesES5].forEach(function (values, i) {
    describe(esversion[i], function () {
      it('works with Map', function () {
        const map = new Map([['foo', 'bar'], ['fox', 'far']])
        assert.deepEqual(Array.from(values(map)), Array.from(map.values()))
      })
      it('works with Objects', function () {
        const i = values({'1': 1, '2': 2})
        assert.deepEqual(Array.from(i), [1, 2])
      })
      it('works with null', function() {
        const i = values(null)
        assert.deepEqual(Array.from(i), [])
      })
    })
  })
})
