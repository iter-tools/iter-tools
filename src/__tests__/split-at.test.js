/* eslint-env node, jest */
const { splitAt, range, slice, asyncSplitAt, asyncToArray } = require('..')

const u = undefined

describe('splitAt', function () {
  it('works when the halves are consumed in order', function () {
    const [[a, b, c], [d, e, f]] = splitAt(3, range())
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]])
  })

  it('works when the source is exhuasted while the first half is being consumed', function () {
    const [[a, b, c], [d, e, f]] = splitAt(3, slice(2, range()))
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, u], [u, u, u]])
  })

  it('works when the source is exhuasted while the second half is being consumed', function () {
    const [[a, b, c], [d, e, f]] = splitAt(3, slice(4, range()))
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, u, u]])
  })

  it('works when the second half is consumed before the first', function () {
    const [first, [d, e, f]] = splitAt(3, range())
    expect([d, e, f]).toEqual([3, 4, 5])
    expect(Array.from(first)).toEqual([0, 1, 2])
  })

  it('works when the sources are consumed alterantely', function () {
    const [first, second] = splitAt(3, range())
    const a = first.next().value
    const d = second.next().value
    const b = first.next().value
    const e = second.next().value
    const c = first.next().value
    const f = second.next().value
    first.return()
    second.return()
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]])
  })

  it('works when the sources are consumed alterantely (reverse)', function () {
    const [first, second] = splitAt(3, range())
    const d = second.next().value
    const a = first.next().value
    const e = second.next().value
    const b = first.next().value
    const f = second.next().value
    const c = first.next().value
    first.return()
    second.return()
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]])
  })
})

describe('asyncSplitAt', function () {
  it('works when the halves are consumed in order', async function () {
    const [first, second] = asyncSplitAt(3, slice(6, range()))
    expect(await asyncToArray(first)).toEqual([0, 1, 2])
    expect(await asyncToArray(second)).toEqual([3, 4, 5])
  })

  it('works when the source is exhuasted while the first half is being consumed', async function () {
    const [first, second] = asyncSplitAt(3, slice(2, range()))
    expect(await asyncToArray(first)).toEqual([0, 1])
    expect(await asyncToArray(second)).toEqual([])
  })

  it('works when the source is exhuasted while the second half is being consumed', async function () {
    const [first, second] = asyncSplitAt(3, slice(4, range()))
    expect(await asyncToArray(first)).toEqual([0, 1, 2])
    expect(await asyncToArray(second)).toEqual([3])
  })

  it('works when the second half is consumed before the first', async function () {
    const [first, second] = asyncSplitAt(3, slice(6, range()))
    expect(await asyncToArray(second)).toEqual([3, 4, 5])
    expect(await asyncToArray(first)).toEqual([0, 1, 2])
  })

  it('works when the sources are consumed alterantely', async function () {
    const [first, second] = asyncSplitAt(3, range())
    const a = (await first.next()).value
    const d = (await second.next()).value
    const b = (await first.next()).value
    const e = (await second.next()).value
    const c = (await first.next()).value
    const f = (await second.next()).value
    first.return()
    second.return()
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]])
  })

  it('works when the sources are consumed alterantely (reverse)', async function () {
    const [first, second] = asyncSplitAt(3, range())
    const d = (await second.next()).value
    const a = (await first.next()).value
    const e = (await second.next()).value
    const b = (await first.next()).value
    const f = (await second.next()).value
    const c = (await first.next()).value
    first.return()
    second.return()
    expect([[a, b, c], [d, e, f]]).toEqual([[0, 1, 2], [3, 4, 5]])
  })
})
