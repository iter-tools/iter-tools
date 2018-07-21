/* eslint-env node, jest */
const { iter, asyncIter, range } = require('iter-tools')

describe('iter', function () {
  it('works with iterables', function () {
    const i = range(3)
    expect(i).toBe(iter(i))
    expect(Array.from(iter(i))).toEqual([0, 1, 2])
  })

  it('works with generators', function () {
    const i = iter(range, 3)
    expect(Array.from(i)).toEqual([0, 1, 2])
  })

  it('works with Symbol.iterator', function () {
    const i = iter([0, 1, 2])
    expect(Array.from(i)).toEqual([0, 1, 2])
  })

  it('works with null', function () {
    const i = iter(null)
    expect(Array.from(i)).toEqual([])
  })

  it('throws with Objects', function () {
    expect(() => {
      iter({'1': 1, '2': 2})
    }).toThrow()
  })

  it('throws with iterators', function () {
    expect(() => {
      iter({next: () => {}})
    }).toThrow()
  })
})

describe('asyncIter', function () {
  it('transform sync iter to async', async function () {
    const iter = asyncIter(range({ start: 1, end: 4 }))
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 2, done: false })
    expect(await iter.next()).toEqual({ value: 3, done: false })
    expect(await iter.next()).toEqual({ value: undefined, done: true })
  })
})
