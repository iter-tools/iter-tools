import assert from 'static-type-assert';

import { $async, $await } from '../../generate/async.macro';
import { $GeneratorIterator, $Promise } from  '../internal/$iterable';
import $InterleaveBuffer from '../internal/interleave/$buffer';
import { $interleave } from '..';

// Without options
// ############

assert<
  $GeneratorIterator<string | number>
>(
  $interleave(
    $async(function * (
      canTakeAny: Function,
      b1: $InterleaveBuffer<string>,
      b2: $InterleaveBuffer<number>
    ) {
      assert<$Promise<boolean>>(b1.canTake())
      assert<$Promise<string | undefined>>(b1.take())
      if ($await(b1.canTake())) {
        assert<$Promise<string>>(b1.take())
        yield $await(b1.take())
      }
      assert<$Promise<boolean>>(b2.canTake())
      assert<$Promise<number | undefined>>(b2.take())
      if ($await(b2.canTake())) {
        assert<$Promise<number>>(b2.take())
        yield $await(b2.take())
      }
    }),
  )(['foo'], [2])
)

assert<
  $GeneratorIterator<string | number | Function>
>(
  $interleave(
    $async(function * (
      canTakeAny: Function,
      b1: $InterleaveBuffer<string>,
      b2: $InterleaveBuffer<number>,
      b3: $InterleaveBuffer<Function>
    ) {
      assert<$Promise<boolean>>(b1.canTake())
      assert<$Promise<string | undefined>>(b1.take())
      if ($await(b1.canTake())) {
        assert<$Promise<string>>(b1.take())
        yield $await(b1.take())
      }
      assert<$Promise<boolean>>(b2.canTake())
      assert<$Promise<number | undefined>>(b2.take())
      if ($await(b2.canTake())) {
        assert<$Promise<number>>(b2.take())
        yield $await(b2.take())
      }
      assert<$Promise<boolean>>(b3.canTake())
      assert<$Promise<Function | undefined>>(b3.take())
      if ($await(b3.canTake())) {
        assert<$Promise<Function>>(b3.take())
        yield $await(b3.take())
      }
    })
  )(['foo'], [2], [(_: any) => _])
)

assert<
  $GeneratorIterator<string | number | Function | {}>
>(
  $interleave(
    $async(function * (
      canTakeAny: Function,
      b1: $InterleaveBuffer<string>,
      b2: $InterleaveBuffer<number>,
      b3: $InterleaveBuffer<Function>,
      b4: $InterleaveBuffer<{}>
    ) {
      assert<$Promise<boolean>>(b1.canTake())
      assert<$Promise<string | undefined>>(b1.take())
      if ($await(b1.canTake())) {
        assert<$Promise<string>>(b1.take())
        yield $await(b1.take())
      }
      assert<$Promise<boolean>>(b2.canTake())
      assert<$Promise<number | undefined>>(b2.take())
      if ($await(b2.canTake())) {
        assert<$Promise<number>>(b2.take())
        yield $await(b2.take())
      }
      assert<$Promise<boolean>>(b3.canTake())
      assert<$Promise<Function | undefined>>(b3.take())
      if ($await(b3.canTake())) {
        assert<$Promise<Function>>(b3.take())
        yield $await(b3.take())
      }
      assert<$Promise<boolean>>(b4.canTake())
      assert<$Promise<{} | undefined>>(b4.take())
      if ($await(b4.canTake())) {
        assert<$Promise<{}>>(b4.take())
        yield $await(b4.take())
      }
    })
  )(['foo'], [2], [(_: any) => _], [{}])
)

// With options
// ############

assert<
  $GeneratorIterator<string | number>
>(
  $interleave(
    $async(function * (
      options: {},
      canTakeAny: Function,
      b1: $InterleaveBuffer<string>,
      b2: $InterleaveBuffer<number>
    ) {
      assert<$Promise<boolean>>(b1.canTake())
      assert<$Promise<string | undefined>>(b1.take())
      if ($await(b1.canTake())) {
        assert<$Promise<string>>(b1.take())
        yield $await(b1.take())
      }
      assert<$Promise<boolean>>(b2.canTake())
      assert<$Promise<number | undefined>>(b2.take())
      if ($await(b2.canTake())) {
        assert<$Promise<number>>(b2.take())
        yield $await(b2.take())
      }
    }),
    {}
  )(['foo'], [2])
)

assert<
  $GeneratorIterator<string | number | Function>
>(
  $interleave(
    $async(function * (
      options: {},
      canTakeAny: Function,
      b1: $InterleaveBuffer<string>,
      b2: $InterleaveBuffer<number>,
      b3: $InterleaveBuffer<Function>
    ) {
      assert<$Promise<boolean>>(b1.canTake())
      assert<$Promise<string | undefined>>(b1.take())
      if ($await(b1.canTake())) {
        assert<$Promise<string>>(b1.take())
        yield $await(b1.take())
      }
      assert<$Promise<boolean>>(b2.canTake())
      assert<$Promise<number | undefined>>(b2.take())
      if ($await(b2.canTake())) {
        assert<$Promise<number>>(b2.take())
        yield $await(b2.take())
      }
      assert<$Promise<boolean>>(b3.canTake())
      assert<$Promise<Function | undefined>>(b3.take())
      if ($await(b3.canTake())) {
        assert<$Promise<Function>>(b3.take())
        yield $await(b3.take())
      }
    }),
    {}
  )(['foo'], [2], [(_: any) => _])
)

assert<
  $GeneratorIterator<string | number | Function | {}>
>(
  $interleave(
    $async(function * (
      options: {},
      canTakeAny: Function,
      b1: $InterleaveBuffer<string>,
      b2: $InterleaveBuffer<number>,
      b3: $InterleaveBuffer<Function>,
      b4: $InterleaveBuffer<{}>
    ) {
      assert<$Promise<boolean>>(b1.canTake())
      assert<$Promise<string | undefined>>(b1.take())
      if ($await(b1.canTake())) {
        assert<$Promise<string>>(b1.take())
        yield $await(b1.take())
      }
      assert<$Promise<boolean>>(b2.canTake())
      assert<$Promise<number | undefined>>(b2.take())
      if ($await(b2.canTake())) {
        assert<$Promise<number>>(b2.take())
        yield $await(b2.take())
      }
      assert<$Promise<boolean>>(b3.canTake())
      assert<$Promise<Function | undefined>>(b3.take())
      if ($await(b3.canTake())) {
        assert<$Promise<Function>>(b3.take())
        yield $await(b3.take())
      }
      assert<$Promise<boolean>>(b4.canTake())
      assert<$Promise<{} | undefined>>(b4.take())
      if ($await(b4.canTake())) {
        assert<$Promise<{}>>(b4.take())
        yield $await(b4.take())
      }
    }),
    {}
  )(['foo'], [2], [(_: any) => _], [{}])
)
