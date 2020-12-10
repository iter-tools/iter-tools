import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $findOr<N, T, S extends T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => value is S,
): (iterable: $Wrappable<T>) => $Promise<S | N>;

declare function $findOr<N, T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
): (iterable: $Wrappable<T>) => $Promise<T | N>;

declare function $findOr<N, T, S extends T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => value is S,
  iterable: $Wrappable<T>,
): $Promise<S | N>;

declare function $findOr<N, T>(
  notFoundValue: N,
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
  iterable: $Wrappable<T>,
): $Promise<T | N>;

export { $findOr };
