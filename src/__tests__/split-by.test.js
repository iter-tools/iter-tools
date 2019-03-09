/* eslint-env node, jest */
const { splitBy, asyncSplitBy, asyncToArray } = require('..')

describe('splitBy', function () {
  it('splitBy', function () {
    const [a, b, c] = splitBy('AAABBCCCCD')
    expect(Array.from(a)).toEqual(['A', 'A', 'A'])
    expect(Array.from(b)).toEqual(['B', 'B'])
    expect(Array.from(c)).toEqual(['C', 'C', 'C', 'C'])
  })
})

describe('asyncSplitBy', function () {
  it('splitBy', async function () {
    const [a, b, c] = asyncSplitBy('AAABBCCCCD')
    expect(await asyncToArray(a)).toEqual(['A', 'A', 'A'])
    expect(await asyncToArray(b)).toEqual(['B', 'B'])
    expect(await asyncToArray(c)).toEqual(['C', 'C', 'C', 'C'])
  })
})
