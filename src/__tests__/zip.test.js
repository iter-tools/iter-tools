/* eslint-env node, jest */
const { zip, asyncZip, asyncToArray, range } = require('..')

const { slice } = require('..')

describe('zip', function () {
  it('zips', function () {
    const iter = zip([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', function () {
    const iter = zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips stopping early', function () {
    const iter = zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8])
    expect(Array.from(iter)).toEqual([[1, 4, 7], [2, 5, 8]])
  })

  it('closes when stopping earlier', function () {
    const repeatX = {
      [Symbol.iterator] () { return this },
      next: () => ({ done: false, value: 'x' }),
      return: jest.fn(() => ({ done: true }))
    }

    const iter = zip(range(2), repeatX)
    expect(Array.from(iter)).toEqual([[0, 'x'], [1, 'x']])
    expect(repeatX.return).toBeCalled()
  })

  it('closes when stopping earlier, using slice', function () { // broken if transpiled with es5 loose
    const repeatX = {
      [Symbol.iterator] () { return this },
      next: () => ({ done: false, value: 'x' }),
      return: jest.fn(() => ({ done: true }))
    }

    const iter = slice(1, zip(range(2), repeatX))
    expect(Array.from(iter)).toEqual([[0, 'x']])
    expect(repeatX.return).toBeCalled()
  })
})

describe('asyncZip', function () {
  it('zips', async function () {
    const iter = asyncZip([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(await asyncToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips using iterables', async function () {
    const iter = asyncZip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
    expect(await asyncToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  })

  it('zips stopping early', async function () {
    const iter = asyncZip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8])
    expect(await asyncToArray(iter)).toEqual([[1, 4, 7], [2, 5, 8]])
  })

  it('closes when stopping earlier', async function () {
    let calledClose = false
    const repeatX = {
      next: () => ({ done: false, value: 'x' }),
      return: () => {
        calledClose = true
        return { done: true }
      }
    }

    const iter = zip(range(2), {[Symbol.iterator]: () => repeatX})
    expect(await asyncToArray(iter)).toEqual([[0, 'x'], [1, 'x']])
    expect(calledClose).toBe(true)
  })
})
