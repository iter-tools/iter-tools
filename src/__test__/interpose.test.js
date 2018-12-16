/* eslint-env node, jest */
const { interpose, asyncInterpose, asyncToArray, range } = require('iter-tools')

describe('interpose', function () {
  it('interposes items into array', function () {
    const iter = interpose(9, [1, 2, 3])
    expect(Array.from(iter)).toEqual([1, 9, 2, 9, 3])
  })

  it('interposes items into an iterable', function () {
    const iter = interpose(null, range({ start: 1, end: 4 }))
    expect(Array.from(iter)).toEqual([1, null, 2, null, 3])
  })

  it('returns mapped iterable (curried version)', function () {
    const iter = interpose([])
    expect(Array.from(iter(range({ start: 1, end: 4 })))).toEqual([1, [], 2, [], 3])
  })

  it('returns empty iterable from null', function () {
    expect(Array.from(interpose('', null))).toEqual([])
  })
})

describe('asyncInterpose', function () {
  it('interposes items into array', async function () {
    const iter = asyncInterpose(9, [1, 2, 3])
    expect(await asyncToArray(iter)).toEqual([1, 9, 2, 9, 3])
  })

  it('interposes items into an iterable', async function () {
    const iter = asyncInterpose(null, range({ start: 1, end: 4 }))
    expect(await asyncToArray(iter)).toEqual([1, null, 2, null, 3])
  })

  it('returns mapped iterable (curried version)', async function () {
    const iter = asyncInterpose([])
    expect(await asyncToArray(iter(range({ start: 1, end: 4 })))).toEqual([1, [], 2, [], 3])
  })

  it('returns empty iterable from null', async function () {
    expect(await asyncToArray(asyncInterpose('', null))).toEqual([])
  })
})
