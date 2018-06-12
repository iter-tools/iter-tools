/* eslint-env node, mocha */
const asyncThrottleES6 = require('../es2018/async-throttle')
const asyncThrottleES5 = require('../es5/async-throttle')
const range = require('../es2018/range')
const asyncIterToArray = require('../es2018/async-iter-to-array')
const assert = require('chai').assert

const esversion = ['es6', 'es5']

describe('asyncThrottle', function () {
  [asyncThrottleES6, asyncThrottleES5].forEach(function (asyncThrottle, i) {
    describe(esversion[i], function () {
      it('throttle the output', async function () {
        const iter = asyncThrottle(10, range(6))
        const t0 = Date.now()
        assert.deepEqual(await asyncIterToArray(iter), [0, 1, 2, 3, 4, 5])
        const t1 = Date.now()
        assert.isAbove(t1 - t0, 50)
      })
    })
  })
})
