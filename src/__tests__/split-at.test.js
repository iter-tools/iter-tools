/**
 * @generated-from ./$split-at.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars */

import { $splitAt, $toArray, slice, range } from './fns'
const $methodName = 'splitAt'
describe($methodName, () => {
  it('works when the halves are consumed in order', () => {
    const [first, second] = $splitAt(3, slice(6, range()))
    expect([$toArray(first), $toArray(second)]).toEqual([[0, 1, 2], [3, 4, 5]])
  })
  it('works when the source is exhuasted while the first half is being consumed', () => {
    const [first, second] = $splitAt(3, slice(2, range()))
    expect([$toArray(first), $toArray(second)]).toEqual([[0, 1], []])
  })
  it('works when the source is exhuasted while the second half is being consumed', () => {
    const [first, second] = $splitAt(3, slice(4, range()))
    expect([$toArray(first), $toArray(second)]).toEqual([[0, 1, 2], [3]])
  })
  it('works when the second half is consumed before the first', () => {
    const [first, second] = $splitAt(3, slice(6, range()))
    expect([$toArray(second), $toArray(first)]).toEqual([[3, 4, 5], [0, 1, 2]])
  })
  it('works when the sources are consumed alterantely', () => {
    const [first, second] = $splitAt(3, range())
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
  it('works when the sources are consumed alterantely (reverse)', () => {
    const [first, second] = $splitAt(3, range())
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
