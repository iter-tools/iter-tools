import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<123>
>(iter.execute(() => 123 as 123))

assert<
  IterableIterator<123>
>(iter.execute((x) => x, 123 as 123, 456 as 456))

assert<
  IterableIterator<[]>
>(iter.execute((...args) => args))

assert<
  IterableIterator<[0, 1, 2]>
>(iter.execute((...args) => args, 0 as 0, 1 as 1, 2 as 2))

assert<
  AsyncIterableIterator<123>
>(iter.asyncExecute(async () => 123 as 123))

assert<
  AsyncIterableIterator<123>
>(iter.asyncExecute(async (x) => x, 123 as 123, 456 as 456))

assert<
  AsyncIterableIterator<[]>
>(iter.asyncExecute(async (...args) => args))

assert<
  AsyncIterableIterator<[0, 1, 2]>
>(iter.asyncExecute(async (...args) => args, 0 as 0, 1 as 1, 2 as 2))
