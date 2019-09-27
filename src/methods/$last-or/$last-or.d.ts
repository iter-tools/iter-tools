import { $InputIterable, $MaybePromise } from '../../internal/$iterable';

declare function $lastOr<E, T = any>(
  whenEmpty: E,
  iterable: $InputIterable<T>,
): $MaybePromise<T | E>;

export default $lastOr;
