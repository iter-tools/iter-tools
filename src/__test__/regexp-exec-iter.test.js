/* eslint-env node, jest */
const { regexpExecIter, asyncRegexpExecIter, asyncToArray } = require('iter-tools')

const getMatchesArray = (iter) => Array.from(iter).map((matches) => matches[0])
const getMatchesArrayAsync = async (iter) => (await asyncToArray(iter)).map((matches) => matches[0])

describe('regexpExecIter', function () {
  it('should exec 1', function () {
    const re = /a+/g
    const iter = regexpExecIter(re, ['aa', 'ba', 'cac'])
    expect(getMatchesArray(iter)).toEqual(['aa', 'a', 'a'])
  })
  it('should exec 2', function () {
    const re = /ca+t/g
    const iter = regexpExecIter(re, ['caat', 'ca', 'dogcat'])
    expect(getMatchesArray(iter)).toEqual(['caat', 'cat'])
  })
  it('should exec 3', function () {
    const re = /ca+t/g
    const iter = regexpExecIter(re, ['caa', 'a', 'tdogca', 't'])
    expect(getMatchesArray(iter)).toEqual(['caaat', 'cat'])
  })
  it('should exec 4', function () {
    const re = /ca+t/g
    const iter = regexpExecIter(re, ['caa', 'a', 'tdogca', 'tcatx'])
    expect(getMatchesArray(iter)).toEqual(['caaat', 'cat', 'cat'])
  })
  it('can be curried', function () {
    const re = /a+/g
    const aRE = regexpExecIter(re)
    const iter = aRE(['aa', 'ba', 'cac'])
    expect(getMatchesArray(iter)).toEqual(['aa', 'a', 'a'])
  })
  it('should exec (nothing to exec)', function () {
    const re = /a+/g
    const iter = regexpExecIter(re, ['xbsd'])
    expect(getMatchesArray(iter)).toEqual([])
  })
  it('should exec (no iterables)', function () {
    const re = /a+/g
    const iter = regexpExecIter(re, [])
    expect(getMatchesArray(iter)).toEqual([])
  })
})

describe('asyncRegexpExecIter', function () {
  it('should exec 1', async function () {
    const re = /a+/g
    const iter = asyncRegexpExecIter(re, ['aa', 'ba', 'cac'])
    expect(await getMatchesArrayAsync(iter)).toEqual(['aa', 'a', 'a'])
  })
  it('should exec 2', async function () {
    const re = /ca+t/g
    const iter = asyncRegexpExecIter(re, ['caat', 'ca', 'dogcat'])
    expect(await getMatchesArrayAsync(iter)).toEqual(['caat', 'cat'])
  })
  it('should exec 3', async function () {
    const re = /ca+t/g
    const iter = asyncRegexpExecIter(re, ['caa', 'a', 'tdogca', 't'])
    expect(await getMatchesArrayAsync(iter)).toEqual(['caaat', 'cat'])
  })
  it('should exec 4', async function () {
    const re = /ca+t/g
    const iter = asyncRegexpExecIter(re, ['caa', 'a', 'tdogca', 'tcatx'])
    expect(await getMatchesArrayAsync(iter)).toEqual(['caaat', 'cat', 'cat'])
  })
  it('can be curried', async function () {
    const re = /a+/g
    const aRE = asyncRegexpExecIter(re)
    const iter = aRE(['aa', 'ba', 'cac'])
    expect(await getMatchesArrayAsync(iter)).toEqual(['aa', 'a', 'a'])
  })
  it('should exec (nothing to exec)', async function () {
    const re = /a+/g
    const iter = asyncRegexpExecIter(re, ['xbsd'])
    expect(await getMatchesArrayAsync(iter)).toEqual([])
  })
  it('should exec (no iterables)', async function () {
    const re = /a+/g
    const iter = asyncRegexpExecIter(re, [])
    expect(await getMatchesArrayAsync(iter)).toEqual([])
  })
})
