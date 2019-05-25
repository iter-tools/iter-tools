import { $isAsync, $async, $await } from '../macros/async.macro'
import { $slice, $toArray } from './$fns'

const $methodName = $isAsync ? 'asyncSlice' : 'slice'

describe($methodName, () => {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('returns simple slice', $async(() => {
    expect($await($toArray($slice(2, list)))).toEqual([0, 1])
  }))

  it('returns simple slice with start/end', $async(() => {
    expect($await($toArray($slice({ start: 1, end: 4 }, list)))).toEqual([1, 2, 3])
  }))

  it('returns empty slice with end > start', $async(() => {
    expect($await($toArray($slice({ start: 4, end: 3 }, list)))).toEqual([])
  }))

  it('returns simple slice with start/end/step', $async(() => {
    expect($await($toArray($slice({ start: 1, end: 6, step: 2 }, list)))).toEqual([1, 3, 5])
  }))

  it('returns empty iterable when passed out of bounds indicies', $async(() => {
    expect($await($toArray($slice({ start: 1, end: 6, step: 2 }, [])))).toEqual([])
  }))

  it('returns empty iterable when passed null iterable', $async(() => {
    expect($await($toArray($slice({ start: 1, end: 4 }, null)))).toEqual([])
  }))

  it('returns curried slice', $async(() => {
    expect($await($toArray($slice(2)(list)))).toEqual([0, 1])
  }))

  it('returns slice with negative end', $async(() => {
    expect($await($toArray($slice({ start: 4, end: -2 }, list)))).toEqual(list.slice(4, -2))
  }))

  it('returns empty slice with negative end', $async(() => {
    expect($await($toArray($slice({ start: 4, end: -8 }, list)))).toEqual([])
  }))

  it('returns slice with negative end and step', $async(() => {
    expect($await($toArray($slice({ start: 1, end: -1, step: 3 }, list)))).toEqual([1, 4, 7])
  }))

  it('returns slice with negative start', $async(() => {
    expect($await($toArray($slice({ start: -3 }, list)))).toEqual([7, 8, 9])
  }))

  it('returns slice with negative start and step', $async(() => {
    expect($await($toArray($slice({ start: -6, step: 2 }, list)))).toEqual([4, 6, 8])
  }))

  it('returns slice with negative start and end', $async(() => {
    expect($await($toArray($slice({ start: -3, end: -1 }, list)))).toEqual([7, 8])
  }))

  it('returns slice with negative start and end, and step', $async(() => {
    expect($await($toArray($slice({ start: -5, end: -1, step: 2 }, list)))).toEqual([5, 7])
  }))

  it('returns slice with negative start and end, and end < start', $async(() => {
    expect($await($toArray($slice({ start: -1, end: -2 }, list)))).toEqual([])
  }))

  it('returns slice with negative start and positive end', $async(() => {
    expect($await($toArray($slice({ start: -5, end: 9 }, list)))).toEqual([5, 6, 7, 8])
  }))

  it('returns slice with negative start and positive end (return empty)', $async(() => {
    expect($await($toArray($slice({ start: -5, end: 2 }, list)))).toEqual([])
  }))

  it('returns slice with negative start and positive end and step', $async(() => {
    expect($await($toArray($slice({ start: -5, end: 9, step: 2 }, list)))).toEqual([5, 7])
  }))
})
