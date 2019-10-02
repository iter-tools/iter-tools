import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $findOr<NF, S extends T, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => item is S,
): (iterable: $SourceIterable<T>) => $Promise<S | NF>;

declare function $findOr<NF, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<T | NF>;

declare function $findOr<NF, S extends T, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => item is S,
  iterable: $SourceIterable<T>,
): $Promise<S | NF>;

declare function $findOr<NF, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<T | NF>;

export default $findOr;
