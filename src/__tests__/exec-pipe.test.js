import { map, filter, execPipe } from '../..'

const bump = x => x + 3
const isEven = x => (x % 2) === 0

describe('execPipe', () => {
  it('works', () => {
    const iter = execPipe([1, 2, 3, 4], map(bump), filter(isEven))
    expect(Array.from(iter)).toEqual([4, 6])
  })
})
