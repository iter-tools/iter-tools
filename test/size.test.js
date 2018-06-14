/* eslint-env node, mocha */
const assert = require('chai').assert
const sizeES6 = require('../es2018/size')
const sizeES5 = require('../es5/size')

const range = require('../es2018/range')

const esversion = ['es6', 'es5']

describe('size', function () {
  [sizeES5, sizeES6].forEach(function (size, i) {
    describe(esversion[i], function () {
      it('return length of array', function () {
        assert.equal(size([1, 2, 3, 4, 5, 6]), 6)
      });

      it('return number of items in iterable', function () {
        assert.equal(size(range({ start: 1, end: 7 })), 6)
      })
    })
  })
})
