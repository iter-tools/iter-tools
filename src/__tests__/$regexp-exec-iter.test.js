import { $async, $await } from '../../generate/async.macro'
import { $regexpExecIter, $toArray } from '../..'

describe($async`regexpExecIter`, () => {
  const getMatchesArray = $async((iter) => $await($toArray(iter)).map((matches) => matches[0]))

  it('should exec 1', $async(() => {
    const re = /a+/g
    const iter = $regexpExecIter(re, ['aa', 'ba', 'cac'])
    expect($await(getMatchesArray(iter))).toEqual(['aa', 'a', 'a'])
  }))

  it('should exec 2', $async(() => {
    const re = /ca+t/g
    const iter = $regexpExecIter(re, ['caat', 'ca', 'dogcat'])
    expect($await(getMatchesArray(iter))).toEqual(['caat', 'cat'])
  }))

  it('should exec 3', $async(() => {
    const re = /ca+t/g
    const iter = $regexpExecIter(re, ['caa', 'a', 'tdogca', 't'])
    expect($await(getMatchesArray(iter))).toEqual(['caaat', 'cat'])
  }))

  it('should exec 4', $async(() => {
    const re = /ca+t/g
    const iter = $regexpExecIter(re, ['caa', 'a', 'tdogca', 'tcatx'])
    expect($await(getMatchesArray(iter))).toEqual(['caaat', 'cat', 'cat'])
  }))

  it('can be curried', $async(() => {
    const re = /a+/g
    const aRE = $regexpExecIter(re)
    const iter = aRE(['aa', 'ba', 'cac'])
    expect($await(getMatchesArray(iter))).toEqual(['aa', 'a', 'a'])
  }))

  it('should exec (nothing to exec)', $async(() => {
    const re = /a+/g
    const iter = $regexpExecIter(re, ['xbsd'])
    expect($await(getMatchesArray(iter))).toEqual([])
  }))

  it('should exec (no iterables)', $async(() => {
    const re = /a+/g
    const iter = $regexpExecIter(re, null)
    expect($await(getMatchesArray(iter))).toEqual([])
  }))
})
