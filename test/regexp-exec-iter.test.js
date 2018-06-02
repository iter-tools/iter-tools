/* eslint-env node, mocha */
const assert = require('chai').assert
const regexpExecES6Iter = require('../es2018/regexp-exec-iter')
const regexpExecES5Iter = require('../es5/regexp-exec-iter')

const asyncRegexpExecES6Iter = require('../es2018/async-regexp-exec-iter')
const asyncRegexpExecES5Iter = require('../es5/async-regexp-exec-iter')
const asyncIterToArray = require('../es2018/async-iter-to-array')

const getMatchesArray = (iter) => Array.from(iter).map((matches) => matches[0])

const getMatchesArrayAsync = async (iter) => (await asyncIterToArray(iter)).map((matches) => matches[0])

const esversion = ['es6', 'es5']

describe('regexpExecIter', function () {
  [regexpExecES6Iter, regexpExecES5Iter].forEach(function (regexpExecIter, i) {
    describe(esversion[i], function () {
      it('should exec 1', function () {
        const re = /a+/g
        const iter = regexpExecIter(re, ['aa', 'ba', 'cac'])
        assert.deepEqual(getMatchesArray(iter), ['aa', 'a', 'a'])
      })
      it('should exec 2', function () {
        const re = /ca+t/g
        const iter = regexpExecIter(re, ['caat', 'ca', 'dogcat'])
        assert.deepEqual(getMatchesArray(iter), ['caat', 'cat'])
      })
      it('should exec 3', function () {
        const re = /ca+t/g
        const iter = regexpExecIter(re, ['caa', 'a', 'tdogca', 't'])
        assert.deepEqual(getMatchesArray(iter), ['caaat', 'cat'])
      })
      it('should exec 4', function () {
        const re = /ca+t/g
        const iter = regexpExecIter(re, ['caa', 'a', 'tdogca', 'tcatx'])
        assert.deepEqual(getMatchesArray(iter), ['caaat', 'cat', 'cat'])
      })
      it('can be curried', function () {
        const re = /a+/g
        const aRE = regexpExecIter(re)
        const iter = aRE(['aa', 'ba', 'cac'])
        assert.deepEqual(getMatchesArray(iter), ['aa', 'a', 'a'])
      })
      it('should exec (nothing to exec)', function () {
        const re = /a+/g
        const iter = regexpExecIter(re, ['xbsd'])
        assert.deepEqual(getMatchesArray(iter), [])
      })
      it('should exec (no iterables)', function () {
        const re = /a+/g
        const iter = regexpExecIter(re, [])
        assert.deepEqual(getMatchesArray(iter), [])
      })
    })
  })
})

describe('asyncRegexpExecIter', function () {
  [asyncRegexpExecES6Iter, asyncRegexpExecES5Iter].forEach(function (asyncRegexpExecIter, i) {
    describe(esversion[i], function () {
      it('should exec 1', async function () {
        const re = /a+/g
        const iter = asyncRegexpExecIter(re, ['aa', 'ba', 'cac'])
        assert.deepEqual(await getMatchesArrayAsync(iter), ['aa', 'a', 'a'])
      })
      it('should exec 2', async function () {
        const re = /ca+t/g
        const iter = asyncRegexpExecIter(re, ['caat', 'ca', 'dogcat'])
        assert.deepEqual(await getMatchesArrayAsync(iter), ['caat', 'cat'])
      })
      it('should exec 3', async function () {
        const re = /ca+t/g
        const iter = asyncRegexpExecIter(re, ['caa', 'a', 'tdogca', 't'])
        assert.deepEqual(await getMatchesArrayAsync(iter), ['caaat', 'cat'])
      })
      it('should exec 4', async function () {
        const re = /ca+t/g
        const iter = asyncRegexpExecIter(re, ['caa', 'a', 'tdogca', 'tcatx'])
        assert.deepEqual(await getMatchesArrayAsync(iter), ['caaat', 'cat', 'cat'])
      })
      it('can be curried', async function () {
        const re = /a+/g
        const aRE = asyncRegexpExecIter(re)
        const iter = aRE(['aa', 'ba', 'cac'])
        assert.deepEqual(await getMatchesArrayAsync(iter), ['aa', 'a', 'a'])
      })
      it('should exec (nothing to exec)', async function () {
        const re = /a+/g
        const iter = asyncRegexpExecIter(re, ['xbsd'])
        assert.deepEqual(await getMatchesArrayAsync(iter), [])
      })
      it('should exec (no iterables)', async function () {
        const re = /a+/g
        const iter = asyncRegexpExecIter(re, [])
        assert.deepEqual(await getMatchesArrayAsync(iter), [])
      })
    })
  })
})
