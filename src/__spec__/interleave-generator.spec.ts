import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<string>
>(
  iter.interleaveGenerator(
    function * (
      canTakeAny: Function,
      buffer: iter.InterleaveBuffer<string>
    ) {
      yield buffer.take()
    }
  )(['foo'])
)

assert<
  IterableIterator<string | number>
>(
  iter.interleaveGenerator(
    function * (
      canTakeAny: Function,
      b1: iter.InterleaveBuffer<string>,
      b2: iter.InterleaveBuffer<number>
    ) {
      yield b1.take()
      yield b2.take()
    }
  )(['foo'], [2])
)

assert<
  IterableIterator<string | number | Function>
>(
  iter.interleaveGenerator(
    function * (
      canTakeAny: Function,
      b1: iter.InterleaveBuffer<string>,
      b2: iter.InterleaveBuffer<number>,
      b3: iter.InterleaveBuffer<Function>
    ) {
      yield b1.take()
      yield b2.take()
      yield b3.take()
    }
  )(['foo'], [2], [(_: any) => _])
)

assert<
  IterableIterator<string | number | Function | {}>
>(
  iter.interleaveGenerator(
    function * (
      canTakeAny: Function,
      b1: iter.InterleaveBuffer<string>,
      b2: iter.InterleaveBuffer<number>,
      b3: iter.InterleaveBuffer<Function>,
      b4: iter.InterleaveBuffer<{}>
    ) {
      yield b1.take()
      yield b2.take()
      yield b3.take()
      yield b4.take()
    }
  )(['foo'], [2], [(_: any) => _], [{}])
)

assert<
  AsyncIterableIterator<string>
>(
  iter.asyncInterleaveGenerator(
    async function * (
      canTakeAny: Function,
      buffer: iter.AsyncInterleaveBuffer<string>
    ) {
      yield await buffer.take()
    }
  )(['foo'])
)

assert<
  AsyncIterableIterator<string | number>
>(
  iter.asyncInterleaveGenerator(
    async function * (
      canTakeAny: Function,
      b1: iter.AsyncInterleaveBuffer<string>,
      b2: iter.AsyncInterleaveBuffer<number>
    ) {
      yield await b1.take()
      yield await b2.take()
    }
  )(['foo'], [2])
)

assert<
  AsyncIterableIterator<string | number | Function>
>(
  iter.asyncInterleaveGenerator(
    async function * (
      canTakeAny: Function,
      b1: iter.AsyncInterleaveBuffer<string>,
      b2: iter.AsyncInterleaveBuffer<number>,
      b3: iter.AsyncInterleaveBuffer<Function>
    ) {
      yield await b1.take()
      yield await b2.take()
      yield await b3.take()
    }
  )(['foo'], [2], [(_: any) => _])
)

assert<
  AsyncIterableIterator<string | number | Function | {}>
>(
  iter.asyncInterleaveGenerator(
    async function * (
      canTakeAny: Function,
      b1: iter.AsyncInterleaveBuffer<string>,
      b2: iter.AsyncInterleaveBuffer<number>,
      b3: iter.AsyncInterleaveBuffer<Function>,
      b4: iter.AsyncInterleaveBuffer<{}>
    ) {
      yield await b1.take()
      yield await b2.take()
      yield await b3.take()
      yield await b4.take()
    }
  )(['foo'], [2], [(_: any) => _], [{}])
 )
