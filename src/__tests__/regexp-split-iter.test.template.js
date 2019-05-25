import { $isAsync, $async, $await } from '../macros/async.macro'
import { $regexpSplitIter, $toArray } from './$fns'

const $methodName = $isAsync ? 'asyncRegexpSplitIter' : 'regexpSplitIter'

describe($methodName, () => {
  it('should split 1', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, ['aa', 'b', 'cc'])
    expect($await($toArray(iter))).toEqual(['aabcc'])
  }))
  it('should split 2', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, ['aa', ' b ', 'cc'])
    expect($await($toArray(iter))).toEqual(['aa', 'b', 'cc'])
  }))
  it('should split 3', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, [' aa', ' b ', '    cc '])
    expect($await($toArray(iter))).toEqual(['', 'aa', 'b', 'cc', ''])
  }))
  it('should split 4', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, ['aa     ', '', ' b ', '    cc '])
    expect($await($toArray(iter))).toEqual(['aa', 'b', 'cc', ''])
  }))
  it('should split 5', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, ['aa     ', ' ', '', ' ', 'b ', '    cc '])
    expect($await($toArray(iter))).toEqual(['aa', 'b', 'cc', ''])
  }))
  it('should split 6', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, ['', ' aa', ' b ', '    cc ', ''])
    expect($await($toArray(iter))).toEqual(['', 'aa', 'b', 'cc', ''])
  }))
  it('should split 7', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, [' ', ' aa', ' b ', '    cc ', ' '])
    expect($await($toArray(iter))).toEqual(['', 'aa', 'b', 'cc', ''])
  }))
  it('can be curried', $async(() => {
    const re = /\s+/g
    const splitter = $regexpSplitIter(re)
    const iter1 = splitter(['aa', ' b ', 'cc'])
    expect($await($toArray(iter1))).toEqual(['aa', 'b', 'cc'])
  }))
  it('should split (nothing to split)', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, ['absd'])
    expect($await($toArray(iter))).toEqual(['absd'])
  }))
  it('should split (no iterables)', $async(() => {
    const re = /\s+/g
    const iter = $regexpSplitIter(re, null)
    expect($await($toArray(iter))).toEqual([])
  }))
  it('should split with empty string', $async(() => {
    const re = ''
    const iter = $regexpSplitIter(re, ['ab', 'c'])
    expect($await($toArray(iter))).toEqual(['a', 'b', 'c'])
  }))
})
