import assert from 'static-type-assert'
import * as iter from '../index'

declare const buf: iter.InterleaveBuffer<'x'>
assert<'x' | undefined>(buf.take())
assert<boolean>(buf.canTake())
buf.canTake() && assert<'x'>(buf.take())

assert<
  IterableIterator<string>
>(
  iter.interleaveGenerator<string>(
    function * gen (
      canTakeAny,
      buffer
    ) {
      assert<iter.InterleaveCallback<iter.InterleaveBuffer<string>[]>>(gen)
      assert<iter.InterleaveBuffer<string>>(buffer)
      assert<iter.InterleaveBuffer<string> | null>(canTakeAny())
      assert<string | undefined>(buffer.take())
      assert<boolean>(buffer.canTake())

      if (buffer.canTake()) {
        assert<iter.TakableInterleaveBuffer<string>>(buffer)
        const res = buffer.take()
        assert<string>(res)
        yield res
      }
    }
  )(['foo'])
)

assert<
  IterableIterator<string>
>(
  iter.interleaveGenerator<string>(
    function * gen (
      canTakeAny,
      ...buffers
    ) {
      assert<iter.InterleaveCallback<iter.InterleaveBuffer<string>[]>>(gen)
      assert<iter.InterleaveBuffer<string>[]>(buffers)
      assert<iter.InterleaveBuffer<string> | null>(canTakeAny())

      for (const buffer of buffers) {
        assert<string | undefined>(buffer.take())
        assert<boolean>(buffer.canTake())

        if (buffer.canTake()) {
          assert<iter.TakableInterleaveBuffer<string>>(buffer)
          const res = buffer.take()
          assert<string>(res)
          yield res
        }
      }
    }
  )(['foo'], ['bar'], ['baz'])
)

assert<
  IterableIterator<string | number>
>(
  iter.interleaveGenerator<string, number>(
    function * gen (
      canTakeAny,
      b1,
      b2
    ) {
      assert<iter.InterleaveCallback<[
        iter.InterleaveBuffer<string>,
        iter.InterleaveBuffer<number>
      ]>>(gen)
      assert<iter.InterleaveBuffer<string>>(b1)
      assert<iter.InterleaveBuffer<number>>(b2)

      if (b1.canTake()) {
        assert<iter.TakableInterleaveBuffer<string>>(b1)
        const res = b1.take()
        assert<string>(res)
        yield res
      }

      if (b2.canTake()) {
        assert<iter.TakableInterleaveBuffer<number>>(b2)
        const res = b2.take()
        assert<number>(res)
        yield res
      }
    }
  )(['foo'], [2])
)

assert<
  IterableIterator<'a' | 'b' | 'c'>
>(
  iter.interleaveGenerator<'a', 'b', 'c'>(
    function * gen (
      canTakeAny,
      ...buffers
    ) {
      assert<[
        iter.InterleaveBuffer<'a'>,
        iter.InterleaveBuffer<'b'>,
        iter.InterleaveBuffer<'c'>
      ]>(buffers)

      const buf = canTakeAny()
      if (buf) if (buf.canTake()) yield buf.take()
    }
  )(['a'], ['b'], ['c'])
)

assert<
  IterableIterator<'a' | 'b' | 'c' | 'd'>
>(
  iter.interleaveGenerator<'a', 'b', 'c', 'd'>(
    function * gen (
      canTakeAny,
      ...buffers
    ) {
      assert<[
        iter.InterleaveBuffer<'a'>,
        iter.InterleaveBuffer<'b'>,
        iter.InterleaveBuffer<'c'>,
        iter.InterleaveBuffer<'d'>
      ]>(buffers)

      const buf = canTakeAny()
      if (buf) if (buf.canTake()) yield buf.take()
    }
  )(['a'], ['b'], ['c'], ['d'])
)
