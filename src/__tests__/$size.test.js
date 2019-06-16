import { $async, $await } from '../../generate/async.macro'
import { $size, range } from '../..'

describe($async`size`, () => {
  it('return length of array', $async(() => {
    expect($await($size([1, 2, 3, 4, 5, 6]))).toBe(6)
  }))

  it('returns 0 for null or undefined', $async(() => {
    expect($await($size(null))).toBe(0)
    expect($await($size(undefined))).toBe(0)
  }))

  it('returns the size of a map', $async(() => {
    expect($await($size(new Map([[1, 1], [2, 2]])))).toBe(2)
  }))

  it('return number of items in iterable', $async(() => {
    expect($await($size(range({ start: 1, end: 7 })))).toBe(6)
  }))
})
