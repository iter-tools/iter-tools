import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $findOr<NF, S extends T, T>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => item is S,
): (iterable: $SourceIterable<T>) => $Promise<S | NF>;

declare function $findOr<NF, T>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<T | NF>;

declare function $findOr<NF, S extends T, T>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => item is S,
  iterable: $SourceIterable<T>,
): $Promise<S | NF>;

declare function $findOr<NF, T>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<T | NF>;

export default $findOr;
