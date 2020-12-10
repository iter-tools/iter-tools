import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $find<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
): (iterable: $Wrappable<T>) => $Promise<S | undefined>;

declare function $find<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
): (iterable: $Wrappable<T>) => $Promise<T | undefined>;

declare function $find<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
  iterable: $Wrappable<T>,
): $Promise<S | undefined>;

declare function $find<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
  iterable: $Wrappable<T>,
): $Promise<T | undefined>;

export { $find };
