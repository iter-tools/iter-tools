/* eslint-env node, jest */
const { asyncToArray } = require('../..')
const splitBy = require('../split-by')
const asyncSplitBy = require('../async-split-by')

describe('splitBy', function () {
  it('splitBy', function () {
    const [a, b, c] = splitBy(undefined, 'AAABBCCCCD')
    expect(Array.from(a)).toEqual(['A', 'A', 'A'])
    expect(Array.from(b)).toEqual(['B', 'B'])
    expect(Array.from(c)).toEqual(['C', 'C', 'C', 'C'])
  })
})

describe('asyncSplitBy', function () {
  it('splitBy', async function () {
    const [a, b, c] = asyncSplitBy(undefined, 'AAABBCCCCD')
    expect(await asyncToArray(a)).toEqual(['A', 'A', 'A'])
    expect(await asyncToArray(b)).toEqual(['B', 'B'])
    expect(await asyncToArray(c)).toEqual(['C', 'C', 'C', 'C'])
  })
})
