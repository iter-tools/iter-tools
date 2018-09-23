import assert from 'static-type-assert'
import * as iter from '../index'

assert<4>(iter.size([0, 1, 2, 3] as [0, 1, 2, 3]))
assert<0 | 1 | 2>(iter.size([] as [] | [number] | [number, number]))
assert<number>(iter.size([0, 1, 2, 3]))
assert<number>(iter.size(iter.iterable('')))
