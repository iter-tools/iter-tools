/* eslint-env node, mocha */
const assert = require('chai').assert
const entriesES6 = require('../es2018/entries')
const entriesES5 = require('../es5/entries')
const range = require('../es2018/range')

const esversion = ['es6', 'es5']

describe('entries', function () {
  [entriesES6, entriesES5].forEach(function (entries, i) {
    describe(esversion[i], function () {
      it('works with Map', function () {
        const mapEntries = [['foo', 'foo'], ['bar', 'bar']] 
        const map = new Map(mapEntries)
        assert.deepEqual(Array.from(entries(map)), mapEntries)
      })
      it('works with Objects', function () {
        const i = entries({'1': 1, '2': 2})
        assert.deepEqual(Array.from(i), [['1', 1], ['2', 2]])
      })
      it('works with null', function() {
        const i = entries(null)
        assert.deepEqual(Array.from(i), [])
      })
    })
  })
})
