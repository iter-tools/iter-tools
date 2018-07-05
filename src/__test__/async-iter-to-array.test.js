/* eslint-env node, jest */
const { range, asyncToArray } = require('iter-tools');

describe('asyncToArray', function () {
  it('transform async iter to array', async function () {
    const arr = await asyncToArray(range({ start: 1, end: 4 }))
    expect(arr).toEqual([1, 2, 3])
  })
})
