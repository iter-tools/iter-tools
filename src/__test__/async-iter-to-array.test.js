/* eslint-env node, jest */
const { range, asyncIterToArray } = require('iter-tools');

describe('asyncIterToArray', function () {
  it('transform async iter to array', async function () {
    const arr = await asyncIterToArray(range({ start: 1, end: 4 }))
    expect(arr).toEqual([1, 2, 3])
  })
})
