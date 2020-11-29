import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $findOr<N, T, S extends T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => value is S,
): (iterable: $SourceIterable<T>) => $Promise<S | N>;

declare function $findOr<N, T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<T | N>;

declare function $findOr<N, T, S extends T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => value is S,
  iterable: $SourceIterable<T>,
): $Promise<S | N>;

declare function $findOr<N, T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<T | N>;

export default $findOr;
