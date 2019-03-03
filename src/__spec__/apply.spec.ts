import assert from 'static-type-assert'
import * as iter from '../index'

declare function add (a: number, b: number): number

assert<number>(iter.apply(add, [1, 2]))
assert<number>(iter.apply(add, iter.map(_ => _, [1, 2])))
