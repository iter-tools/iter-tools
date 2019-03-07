/* eslint-env node, jest */
const { splitBy } = require('..')

describe.skip('splitBy', function () {
  it('splitBy', function () {
    const [a, b, c] = splitBy('AAABBCCCCD')
    expect(Array.from(a)).toEqual(['A', 'A', 'A'])
    expect(Array.from(b)).toEqual(['B', 'B'])
    expect(Array.from(c)).toEqual(['C', 'C', 'C', 'C'])
  })
})
