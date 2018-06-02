/* eslint-env node, mocha */
const assert = require('chai').assert
const asyncIterToArrayES5 = require('../es5/async-iter-to-array')
const asyncIterToArrayES6 = require('../es2018/async-iter-to-array')
const range = require('../es2018/range')

const esversion = ['es5', 'es6']

describe('asyncIterToArray', function () {
  [asyncIterToArrayES5, asyncIterToArrayES6].forEach(function (asyncIterToArray, i) {
    describe(esversion[i], function () {
      it('transform async iter to array', async function () {
        const arr = await asyncIterToArray(range({ start: 1, end: 4 }))
        assert.deepEqual(arr, [1, 2, 3])
      })
    })
  })
})
