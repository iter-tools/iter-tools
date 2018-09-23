import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<number>
>(iter.values({ foo: 42 }))

assert<
  IterableIterator<string | null>
>(iter.values({ foo: '', bar: null }))

assert<
  IterableIterator<never>
>(iter.values({}))
