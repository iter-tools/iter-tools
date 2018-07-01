/* eslint-env node, jest */
const { regexpSplitIter, asyncRegexpSplitIter, asyncIterToArray } = require('iter-tools')

describe('regexpSplitIter', function () {
  it('should split 1', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, ['aa', 'b', 'cc'])
    expect(Array.from(iter)).toEqual(['aabcc'])
  })
  it('should split 2', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, ['aa', ' b ', 'cc'])
    expect(Array.from(iter)).toEqual(['aa', 'b', 'cc'])
  })
  it('should split 3', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, [' aa', ' b ', '    cc '])
    expect(Array.from(iter)).toEqual(['', 'aa', 'b', 'cc', ''])
  })
  it('should split 4', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, ['aa     ', '', ' b ', '    cc '])
    expect(Array.from(iter)).toEqual(['aa', 'b', 'cc', ''])
  })
  it('should split 5', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, ['aa     ', ' ', '', ' ', 'b ', '    cc '])
    expect(Array.from(iter)).toEqual(['aa', 'b', 'cc', ''])
  })
  it('should split 6', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, ['', ' aa', ' b ', '    cc ', ''])
    expect(Array.from(iter)).toEqual(['', 'aa', 'b', 'cc', ''])
  })
  it('should split 7', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, [' ', ' aa', ' b ', '    cc ', ' '])
    expect(Array.from(iter)).toEqual(['', 'aa', 'b', 'cc', ''])
  })
  it('can be curried', function () {
    const re = /\s+/g
    const splitter = regexpSplitIter(re)
    const iter1 = splitter(['aa', ' b ', 'cc'])
    expect(Array.from(iter1)).toEqual(['aa', 'b', 'cc'])
  })
  it('should split (nothing to split)', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, ['absd'])
    expect(Array.from(iter)).toEqual(['absd'])
  })
  it('should split (no iterables)', function () {
    const re = /\s+/g
    const iter = regexpSplitIter(re, [])
    expect(Array.from(iter)).toEqual([])
  })
  it('should split with empty string', function () {
    const re = ''
    const iter = regexpSplitIter(re, ['ab', 'c'])
    expect(Array.from(iter)).toEqual(['a', 'b', 'c'])
  })
})

describe('asyncRegexpSplitIter', function () {
  it('should split 1', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, ['aa', 'b', 'cc'])
    expect(await asyncIterToArray(iter)).toEqual(['aabcc'])
  })
  it('should split 2', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, ['aa', ' b ', 'cc'])
    expect(await asyncIterToArray(iter)).toEqual(['aa', 'b', 'cc'])
  })
  it('should split 3', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, [' aa', ' b ', '    cc '])
    expect(await asyncIterToArray(iter)).toEqual(['', 'aa', 'b', 'cc', ''])
  })
  it('should split 4', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, ['aa     ', '', ' b ', '    cc '])
    expect(await asyncIterToArray(iter)).toEqual(['aa', 'b', 'cc', ''])
  })
  it('should split 5', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, ['aa     ', ' ', '', ' ', 'b ', '    cc '])
    expect(await asyncIterToArray(iter)).toEqual(['aa', 'b', 'cc', ''])
  })
  it('should split 6', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, ['', ' aa', ' b ', '    cc ', ''])
    expect(await asyncIterToArray(iter)).toEqual(['', 'aa', 'b', 'cc', ''])
  })
  it('should split 7', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, [' ', ' aa', ' b ', '    cc ', ' '])
    expect(await asyncIterToArray(iter)).toEqual(['', 'aa', 'b', 'cc', ''])
  })
  it('can be curried', async function () {
    const re = /\s+/g
    const splitter = asyncRegexpSplitIter(re)
    const iter1 = splitter(['aa', ' b ', 'cc'])
    expect(await asyncIterToArray(iter1)).toEqual(['aa', 'b', 'cc'])
  })
  it('should split (nothing to split)', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, ['absd'])
    expect(await asyncIterToArray(iter)).toEqual(['absd'])
  })
  it('should split (no iterables)', async function () {
    const re = /\s+/g
    const iter = asyncRegexpSplitIter(re, [])
    expect(await asyncIterToArray(iter)).toEqual([])
  })
  it('should split with empty string', async function () {
    const re = ''
    const iter = asyncRegexpSplitIter(re, ['ab', 'c'])
    expect(await asyncIterToArray(iter)).toEqual(['a', 'b', 'c'])
  })
})
