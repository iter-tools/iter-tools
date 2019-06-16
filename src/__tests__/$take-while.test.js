import { $isAsync, $async, $await } from '../../generate/async.macro'
import { $takeWhile, $toArray, range } from '../..'

describe($async`takeWhile`, () => {
  it('takeWhile on array', $async(() => {
    const iter = $takeWhile((item) => item % 2 === 0, [2, 2, 3, 2, 2, 2])
    expect($await($toArray(iter))).toEqual([2, 2])
  }))

  it('takeWhile on iterable', $async(() => {
    const iter = $takeWhile((item) => item !== 4, range({ start: 1, end: 7 }))
    expect($await($toArray(iter))).toEqual([1, 2, 3])
  }))

  it('takeWhile on iterable (curried version)', $async(() => {
    const iter = $takeWhile((item) => item !== 4)
    expect($await($toArray(iter(range({ start: 1, end: 7 }))))).toEqual([1, 2, 3])
  }))

  it('takeWhile on empty iterable', $async(() => {
    expect($await($toArray($takeWhile((item) => item, null)))).toEqual([])
  }))

  if ($isAsync) {
    it('takeWhile on array (using a promise)', $async(() => {
      const iter = $takeWhile((item) => Promise.resolve(item % 2 === 0), [2, 2, 3, 2, 2, 2])
      expect($await($toArray(iter))).toEqual([2, 2])
    }))
  }
})
