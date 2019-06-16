import { map, filter, pipe } from '../..'

const bump = x => x + 3
const isEven = x => (x % 2) === 0

describe('pipe', () => {
  it('composes iterables', () => {
    const iter = pipe(map(bump), filter(isEven))
    expect(Array.from(iter([1, 2, 3, 4]))).toEqual([4, 6])
  })

  it('composes iterables (check order)', () => {
    const iter = pipe(filter(isEven), map(bump))
    expect(Array.from(iter([1, 2, 3, 4]))).toEqual([5, 7])
  })
})
