/* eslint-env node, jest */
const { tee, asyncTee, asyncToArray, range } = require('..')

describe('tee', function () {
  it('tee iterable', function () {
    const iters = tee(range(3), 3)
    expect(iters.length).toBe(3)
    expect(iters[0].next().value).toBe(0)
    expect(iters[0].next().value).toBe(1)

    expect(iters[1].next().value).toBe(0)
    expect(iters[1].next().value).toBe(1)
    expect(iters[1].next().value).toBe(2)
    expect(iters[1].next().done).toBe(true)

    expect(iters[0].next().value).toBe(2)
    expect(iters[0].next().done).toBe(true)

    expect(iters[2].next().value).toBe(0)
    expect(iters[2].next().value).toBe(1)
    expect(iters[2].next().value).toBe(2)
    expect(iters[2].next().done).toBe(true)
  })

  it('closes when exhausted', function () {
    const repeatX = {
      [Symbol.iterator] () { return this },
      next: () => ({ done: false, value: 'x' }),
      return: jest.fn(() => ({ done: true }))
    }
    const [iter1, iter2] = tee(repeatX)
    iter1[Symbol.iterator]().next() // you can't close a brand new iterator
    iter1[Symbol.iterator]().return()
    expect(repeatX.return).toBeCalledTimes(0)
    iter2[Symbol.iterator]().next() // you can't close a brand new iterator
    iter2[Symbol.iterator]().return()
    expect(repeatX.return).toBeCalled()
  })
})

describe('asyncTee', function () {
  it('tee iterable', async function () {
    const iters = asyncTee(range(3), 3)
    expect(iters.length).toBe(3)
    expect((await iters[0].next()).value).toBe(0)
    expect((await iters[0].next()).value).toBe(1)

    expect((await iters[1].next()).value).toBe(0)
    expect((await iters[1].next()).value).toBe(1)
    expect((await iters[1].next()).value).toBe(2)
    expect((await iters[1].next()).done).toBe(true)

    expect((await iters[0].next()).value).toBe(2)
    expect((await iters[0].next()).done).toBe(true)

    expect((await iters[2].next()).value).toBe(0)
    expect((await iters[2].next()).value).toBe(1)
    expect((await iters[2].next()).value).toBe(2)
    expect((await iters[2].next()).done).toBe(true)
  })

  it('tee iterable', async function () {
    const iters = asyncTee([0, 1, 2], 3)

    expect(await asyncToArray(iters[0])).toEqual([0, 1, 2])
    expect(await asyncToArray(iters[1])).toEqual([0, 1, 2])
    expect(await asyncToArray(iters[2])).toEqual([0, 1, 2])
  })

  it('tee iterable async', function () {
    const iters = asyncTee([0, 1, 2], 2)
    const a = asyncToArray(iters[0])
      .then(arr => {
        expect(arr).toEqual([0, 1, 2])
      })

    const b = asyncToArray(iters[1])
      .then(arr => {
        expect(arr).toEqual([0, 1, 2])
      })

    return Promise.all([a, b])
  })
})
