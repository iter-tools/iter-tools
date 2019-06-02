import { $InputIterable, $GeneratorIterator, $Iterable, $Promise } from './internal/$iterable';
import $InterleaveBuffer from './internal/interleave/$buffer';

// prettier-ignore
declare function $interleave<T1 = any, T2 = any, R = any>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
  ) => $Iterable<R>,
): (
  i1: $InputIterable<T1>,
  i2: $InputIterable<T2>
) => $GeneratorIterator<R>;

declare function $interleave<T1 = any, T2 = any, T3 = any, R = any>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
  ) => $Iterable<R>,
): (
  i1: $InputIterable<T1>,
  i2: $InputIterable<T2>,
  i3: $InputIterable<T3>,
) => $GeneratorIterator<R>;

declare function $interleave<T1 = any, T2 = any, T3 = any, T4 = any, R = any>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3 | T4> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
    b4: $InterleaveBuffer<T4>,
  ) => $Iterable<R>,
): (
  i1: $InputIterable<T1>,
  i2: $InputIterable<T2>,
  i3: $InputIterable<T3>,
  i4: $InputIterable<T4>,
) => $GeneratorIterator<R>;

declare function $interleave<T, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T> | null>,
    ...buffers: Array<$InterleaveBuffer<T>>
  ) => $Iterable<R>,
): (...iterables: Array<$InputIterable<T>>) => $GeneratorIterator<R>;

declare function $interleave<T1 = any, T2 = any, R = any>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
  ) => $Iterable<R>,
  i1: $InputIterable<T1>,
  i2: $InputIterable<T2>,
): $GeneratorIterator<R>;

declare function $interleave<T1 = any, T2 = any, T3 = any, R = any>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
  ) => $Iterable<R>,
  i1: $InputIterable<T1>,
  i2: $InputIterable<T2>,
  i3: $InputIterable<T3>,
): $GeneratorIterator<R>;

declare function $interleave<T1 = any, T2 = any, T3 = any, T4 = any, R = any>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3 | T4> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
    b4: $InterleaveBuffer<T4>,
  ) => $Iterable<R>,
  i1: $InputIterable<T1>,
  i2: $InputIterable<T2>,
  i3: $InputIterable<T3>,
  i4: $InputIterable<T4>,
): $GeneratorIterator<R>;

declare function $interleave<T, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T> | null>,
    ...buffers: Array<$InterleaveBuffer<T>>
  ) => $Iterable<R>,
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<R>;

export default $interleave;
