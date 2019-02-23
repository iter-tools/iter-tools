import assert from 'static-type-assert'
import * as iter from '../index'

declare function add (a: number, b: number): number

assert<number>(iter.call(add, 1, 1))
