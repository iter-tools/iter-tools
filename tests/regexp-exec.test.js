/* eslint-env node, mocha */
const assert = require('chai').assert
const regexpExecES6 = require('../lib/regexp-exec')
const regexpExecES5 = require('../es5/regexp-exec')

const esversion = ['es6', 'es5']

describe('regexpExec', function () {
  [regexpExecES6, regexpExecES5].forEach(function (regexpExec, i) {
    describe(esversion[i], function () {
      it('should find matches', function () {
        const re = /[0-9]{4}/g
        const iter = regexpExec(re, '10/2/2013, 03/03/2015 12/4/1997')
        const results = []
        for (let [i] of iter) {
          results.push(i)
        }
        assert.deepEqual(results, ['2013', '2015', '1997'])
      })
    })
  })
})
