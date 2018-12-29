/* eslint-env node, jest */
const { tap, asyncTap, asyncToArray, range } = require('iter-tools')

describe('tap', function () {
  it('return tapped iterable', function () {
    const iter = tap(function (item) { return item * 2 }, [1, 2, 3])
    expect(Array.from(iter)).toEqual([1, 2, 3])
  })

  it('return tapped iterable from iterable', function () {
    const iter = tap(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
    expect(Array.from(iter)).toEqual([1, 2, 3])
  })

  it('return tapped iterable (curried version)', function () {
    const iter = tap(function (item) { return item * 2 })
    expect(Array.from(iter(range({ start: 1, end: 4 })))).toEqual([1, 2, 3])
  })
})

describe('asyncTap', function () {
  it('return tapped iterable', async function () {
    const iter = asyncTap(function (item) { return item * 2 }, [1, 2, 3])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3])
  })

  it('return tapped iterable (using a promise)', async function () {
    const iter = asyncTap(function (item) { return Promise.resolve(item * 2) }, [1, 2, 3])
    expect(await asyncToArray(iter)).toEqual([1, 2, 3])
  })

  it('return tapped iterable from iterable', async function () {
    const iter = asyncTap(function (item) { return item * 2 }, range({ start: 1, end: 4 }))
    expect(await asyncToArray(iter)).toEqual([1, 2, 3])
  })

  it('return tapped iterable (curried version)', async function () {
    const iter = asyncTap(function (item) { return item * 2 })
    expect(await asyncToArray(iter(range({ start: 1, end: 4 })))).toEqual([1, 2, 3])
  })
})
