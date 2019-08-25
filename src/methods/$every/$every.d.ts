import { $InputIterable, $Promise, $MaybePromise } from '../../internal/$iterable';

declare function $every<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $Promise<boolean>;

declare function $every<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $Promise<boolean>;

export default $every;
