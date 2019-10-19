import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable, $Iterable } from '../../types/$iterable';
import $InterleaveBuffer from './internal/$buffer';

// Without options:
// #############

// prettier-ignore
declare function $interleave<T1, T2, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
  ) => $Iterable<R>,
): (
    s1: $SourceIterable<T1>,
    s2: $SourceIterable<T2>
  ) => $ResultIterable<R>;

declare function $interleave<T1, T2, T3, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
  ) => $Iterable<R>,
): (
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
) => $ResultIterable<R>;

declare function $interleave<T1, T2, T3, T4, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3 | T4> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
    b4: $InterleaveBuffer<T4>,
  ) => $Iterable<R>,
): (
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
  s4: $SourceIterable<T4>,
) => $ResultIterable<R>;

declare function $interleave<T, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T> | null>,
    ...buffers: Array<$InterleaveBuffer<T>>
  ) => $Iterable<R>,
): (...sources: Array<$SourceIterable<T>>) => $ResultIterable<R>;

declare function $interleave<T1, T2, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
  ) => $Iterable<R>,
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
): $ResultIterable<R>;

declare function $interleave<T1, T2, T3, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
  ) => $Iterable<R>,
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
): $ResultIterable<R>;

declare function $interleave<T1, T2, T3, T4, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3 | T4> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
    b4: $InterleaveBuffer<T4>,
  ) => $Iterable<R>,
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
  s4: $SourceIterable<T4>,
): $ResultIterable<R>;

declare function $interleave<T, R>(
  gen: (
    canTakeAny: () => $Promise<$InterleaveBuffer<T> | null>,
    ...buffers: Array<$InterleaveBuffer<T>>
  ) => $Iterable<R>,
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<R>;

// With options:
// #############

// prettier-ignore
declare function $interleave<O extends {}, T1, T2, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
  ) => $Iterable<R>,
  options: O,
): (
    s1: $SourceIterable<T1>,
    s2: $SourceIterable<T2>
  ) => $ResultIterable<R>;

declare function $interleave<O extends {}, T1, T2, T3, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
  ) => $Iterable<R>,
  options: O,
): (
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
) => $ResultIterable<R>;

declare function $interleave<O extends {}, T1, T2, T3, T4, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3 | T4> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
    b4: $InterleaveBuffer<T4>,
  ) => $Iterable<R>,
  options: O,
): (
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
  s4: $SourceIterable<T4>,
) => $ResultIterable<R>;

declare function $interleave<O extends {}, T, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T> | null>,
    ...buffers: Array<$InterleaveBuffer<T>>
  ) => $Iterable<R>,
  options: O,
): (...sources: Array<$SourceIterable<T>>) => $ResultIterable<R>;

declare function $interleave<O extends {}, T1, T2, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
  ) => $Iterable<R>,
  options: O,
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
): $ResultIterable<R>;

declare function $interleave<O extends {}, T1, T2, T3, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
  ) => $Iterable<R>,
  options: O,
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
): $ResultIterable<R>;

declare function $interleave<O extends {}, T1, T2, T3, T4, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T1 | T2 | T3 | T4> | null>,
    b1: $InterleaveBuffer<T1>,
    b2: $InterleaveBuffer<T2>,
    b3: $InterleaveBuffer<T3>,
    b4: $InterleaveBuffer<T4>,
  ) => $Iterable<R>,
  options: O,
  s1: $SourceIterable<T1>,
  s2: $SourceIterable<T2>,
  s3: $SourceIterable<T3>,
  s4: $SourceIterable<T4>,
): $ResultIterable<R>;

declare function $interleave<O extends {}, T, R>(
  gen: (
    options: O,
    canTakeAny: () => $Promise<$InterleaveBuffer<T> | null>,
    ...buffers: Array<$InterleaveBuffer<T>>
  ) => $Iterable<R>,
  options: O,
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<R>;

export default $interleave;
