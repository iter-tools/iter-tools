/* eslint-env node, jest */
const { asyncToArray } = require('../..')
const splitBy = require('../split-by')
const asyncSplitBy = require('../async-split-by')
const { OneTwoThreeIterable, AsyncOneTwoThreeIterable } = require('../test-fixtures')

describe('splitBy', function () {
  it('splitBy', function () {
    const [a, b, c] = splitBy(undefined, 'AAABBCCCCD')
    expect(Array.from(a)).toEqual(['A', 'A', 'A'])
    expect(Array.from(b)).toEqual(['B', 'B'])
    expect(Array.from(c)).toEqual(['C', 'C', 'C', 'C'])
  })

  it('cleans up the iterable', function () {
    const oneTwoThree = new OneTwoThreeIterable()
    const [a, b, c] = splitBy(undefined, oneTwoThree)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
    Array.from(a)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
    Array.from(b)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
    Array.from(c)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
  })
})

describe('asyncSplitBy', function () {
  it('splitBy', async function () {
    const [a, b, c] = asyncSplitBy(undefined, 'AAABBCCCCD')
    expect(await asyncToArray(a)).toEqual(['A', 'A', 'A'])
    expect(await asyncToArray(b)).toEqual(['B', 'B'])
    expect(await asyncToArray(c)).toEqual(['C', 'C', 'C', 'C'])
  })

  it('cleans up the iterable', async function () {
    const oneTwoThree = new AsyncOneTwoThreeIterable()
    const [a, b, c] = asyncSplitBy(undefined, oneTwoThree)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
    await asyncToArray(a)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
    await asyncToArray(b)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', false)
    await asyncToArray(c)
    expect(oneTwoThree).toHaveProperty('isCleanedUp', true)
  })
})
