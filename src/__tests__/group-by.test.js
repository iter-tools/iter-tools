/* eslint-env node, jest */
const { groupBy, asyncGroupBy, asyncToArray } = require('..')

describe('groupBy', function () {
  it('groupBy main cursor', function () {
    const iter = groupBy(undefined, 'AAABBAACCCCD')
    let next
    next = iter.next()
    expect(next.value[0]).toBe('A')
    next = iter.next()
    expect(next.value[0]).toBe('B')
    next = iter.next()
    expect(next.value[0]).toBe('A')
    next = iter.next()
    expect(next.value[0]).toBe('C')
    next = iter.next()
    expect(next.value[0]).toBe('D')
    next = iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy use key function', function () {
    const iter = groupBy((item) => item.toLowerCase(), 'AaaBbaACccCD')
    let next
    next = iter.next()
    expect(next.value[0]).toBe('a')
    next = iter.next()
    expect(next.value[0]).toBe('b')
    next = iter.next()
    expect(next.value[0]).toBe('a')
    next = iter.next()
    expect(next.value[0]).toBe('c')
    next = iter.next()
    expect(next.value[0]).toBe('d')
    next = iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy main cursor (curried)', function () {
    const iter = groupBy()('AAABBAACCCCD')
    let next
    next = iter.next()
    expect(next.value[0]).toBe('A')
    next = iter.next()
    expect(next.value[0]).toBe('B')
    next = iter.next()
    expect(next.value[0]).toBe('A')
    next = iter.next()
    expect(next.value[0]).toBe('C')
    next = iter.next()
    expect(next.value[0]).toBe('D')
    next = iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy secondary', function () {
    const iter = groupBy(undefined, 'AAABBAACCCCD')
    let next
    next = iter.next()
    expect(next.value[0]).toBe('A')
    expect(Array.from(next.value[1])).toEqual(['A', 'A', 'A'])
    next = iter.next()
    expect(next.value[0]).toBe('B')
    expect(Array.from(next.value[1])).toEqual(['B', 'B'])
    next = iter.next()
    expect(next.value[0]).toBe('A')
    expect(Array.from(next.value[1])).toEqual(['A', 'A'])
    next = iter.next()
    expect(next.value[0]).toBe('C')
    expect(Array.from(next.value[1])).toEqual(['C', 'C', 'C', 'C'])
    next = iter.next()
    expect(next.value[0]).toBe('D')
    expect(Array.from(next.value[1])).toEqual(['D'])
    next = iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy secondary (consume partially)', function () {
    const iter = groupBy(undefined, 'AAABBAACCCCD')
    let next
    next = iter.next()
    expect(next.value[0]).toBe('A')
    expect(next.value[1].next().value).toBe('A')
    expect(next.value[1].next().value).toBe('A')
    expect(next.value[1].next().value).toBe('A')
    expect(next.value[1].next().done).toBe(true)
    next = iter.next()
    expect(next.value[0]).toBe('B')
    // ...
  })

  it('groupBy of null returns empty iterable', function () {
    expect(Array.from(groupBy(undefined, null))).toEqual([])
  })
})

describe('asyncGroupBy', function () {
  it('groupBy main cursor', async function () {
    const iter = asyncGroupBy(undefined, 'AAABBAACCCCD')
    let next
    next = await iter.next()
    expect(next.value[0]).toBe('A')
    next = await iter.next()
    expect(next.value[0]).toBe('B')
    next = await iter.next()
    expect(next.value[0]).toBe('A')
    next = await iter.next()
    expect(next.value[0]).toBe('C')
    next = await iter.next()
    expect(next.value[0]).toBe('D')
    next = await iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy use key function', async function () {
    const iter = asyncGroupBy((item) => item.toLowerCase(), 'AaaBbaACccCD')
    let next
    next = await iter.next()
    expect(next.value[0]).toBe('a')
    next = await iter.next()
    expect(next.value[0]).toBe('b')
    next = await iter.next()
    expect(next.value[0]).toBe('a')
    next = await iter.next()
    expect(next.value[0]).toBe('c')
    next = await iter.next()
    expect(next.value[0]).toBe('d')
    next = await iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy use key function (using a promise)', async function () {
    const iter = asyncGroupBy(async (item) => item.toLowerCase(), 'AaaBbaACccCD')
    let next
    next = await iter.next()
    expect(next.value[0]).toBe('a')
    next = await iter.next()
    expect(next.value[0]).toBe('b')
    next = await iter.next()
    expect(next.value[0]).toBe('a')
    next = await iter.next()
    expect(next.value[0]).toBe('c')
    next = await iter.next()
    expect(next.value[0]).toBe('d')
    next = await iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy main cursor (curried)', async function () {
    const iter = asyncGroupBy()('AAABBAACCCCD')
    let next
    next = await iter.next()
    expect(next.value[0]).toBe('A')
    next = await iter.next()
    expect(next.value[0]).toBe('B')
    next = await iter.next()
    expect(next.value[0]).toBe('A')
    next = await iter.next()
    expect(next.value[0]).toBe('C')
    next = await iter.next()
    expect(next.value[0]).toBe('D')
    next = await iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy secondary', async function () {
    const iter = asyncGroupBy(undefined, 'AAABBAACCCCD')
    let next
    next = await iter.next()
    expect(next.value[0]).toBe('A')
    expect(await asyncToArray(next.value[1])).toEqual(['A', 'A', 'A'])
    next = await iter.next()
    expect(next.value[0]).toBe('B')
    expect(await asyncToArray(next.value[1])).toEqual(['B', 'B'])
    next = await iter.next()
    expect(next.value[0]).toBe('A')
    expect(await asyncToArray(next.value[1])).toEqual(['A', 'A'])
    next = await iter.next()
    expect(next.value[0]).toBe('C')
    expect(await asyncToArray(next.value[1])).toEqual(['C', 'C', 'C', 'C'])
    next = await iter.next()
    expect(next.value[0]).toBe('D')
    expect(await asyncToArray(next.value[1])).toEqual(['D'])
    next = await iter.next()
    expect(next.done).toBe(true)
  })

  it('groupBy secondary (consume partially)', async function () {
    const iter = asyncGroupBy(undefined, 'AAABBAACCCCD')
    let next
    next = await iter.next()
    expect(next.value[0]).toBe('A')
    expect((await next.value[1].next()).value).toBe('A')
    expect((await next.value[1].next()).value).toBe('A')
    expect((await next.value[1].next()).value).toBe('A')
    expect((await next.value[1].next()).done).toBe(true)
    next = await iter.next()
    expect(next.value[0]).toBe('B')
    // ...
  })

  it('groupBy of null returns empty iterable', async function () {
    expect(await asyncToArray(asyncGroupBy(undefined, null))).toEqual([])
  })
})
