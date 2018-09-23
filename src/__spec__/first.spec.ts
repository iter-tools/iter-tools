import assert from 'static-type-assert'
import * as iter from '../index'

assert<undefined>(iter.first([]))
assert<0>(iter.first([0, 1, 2, 3] as [0, 1, 2, 3]))
assert<number>(iter.first([0, 1, 2] as [number, ...any[]]))
assert<number | undefined>(iter.first(Array<number>()))
assert<string | undefined>(iter.first(iter.iterable('')))
