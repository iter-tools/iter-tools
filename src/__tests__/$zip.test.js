import { $isAsync, $async, $await } from '../macros/async.macro'
import { $zip, $toArray, $slice, range } from './$fns'
import { OneTwoThreeIterable, AsyncOneTwoThreeIterable } from './__framework__/fixtures'

const $OneTwoThreeIterable = $isAsync ? AsyncOneTwoThreeIterable : OneTwoThreeIterable
const $methodName = $isAsync ? 'asyncZip' : 'zip'

describe($methodName, () => {
  it('zips', $async(() => {
    const iter = $zip([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  }))

  it('zips using iterables', $async(() => {
    const iter = $zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8, 9])
    expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
  }))

  it('zips stopping early', $async(() => {
    const iter = $zip(range({ start: 1, end: 4 }), range({ start: 4, end: 7 }), [7, 8])
    expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8]])
  }))

  it('closes when stopping earlier', $async(() => { // broken if transpiled with es5 loose
    const $oneTwoThree = new $OneTwoThreeIterable()
    const iter = $slice(2, $zip(range(2), $oneTwoThree))
    expect($await($toArray(iter))).toEqual([[0, 1], [1, 2]])
    expect($oneTwoThree).toHaveProperty('isCleanedUp', true)
  }))
})
