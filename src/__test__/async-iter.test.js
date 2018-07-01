/* eslint-env node, jest */
const { range, asyncIter } = require('iter-tools');

describe('asyncIter', function () {
  it('transform sync iter to async', async function () {
    const iter = asyncIter(range({ start: 1, end: 4 }))
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
    expect(await iter.next()).toEqual({ value: undefined, done: true })
  })
})
