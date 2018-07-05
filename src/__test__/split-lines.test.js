/* eslint-env node, jest */
const { splitLines, asyncSplitLines, asyncToArray } = require('iter-tools')

describe('splitLines', function () {
  it('should split 1', function () {
    const iter = splitLines(['aa', '\nb', 'cc'])
    expect(Array.from(iter)).toEqual(['aa', 'bcc'])
  })
  it('should split 2', function () {
    const iter = splitLines(['aa\n', 'b ', 'cc\n'])
    expect(Array.from(iter)).toEqual(['aa', 'b cc', ''])
  })
})

describe('asyncSplitLines', function () {
  it('should split 1', async function () {
    const iter = asyncSplitLines(['aa', '\nb', 'cc'])
    expect(await asyncToArray(iter)).toEqual(['aa', 'bcc'])
  })
  it('should split 2', async function () {
    const iter = asyncSplitLines(['aa\n', 'b ', 'cc\n'])
    expect(await asyncToArray(iter)).toEqual(['aa', 'b cc', ''])
  })
})
