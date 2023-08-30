import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $findBestOr<N, T>(
  notFoundValue: N,
  comparer: (best: T, value: T) => boolean,
): (iterable: $Wrappable<T>) => $Promise<T | N>;

declare function $findBestOr<N, T>(
  notFoundValue: N,
  comparer: (best: T, value: T) => boolean,
  iterable: $Wrappable<T>,
): $Promise<T | N>;

declare function $findBestOr<N, T, S>(
  notFoundValue: N,
  comparer: (best: S, value: S) => boolean,
  mapper: (value: T, i: number) => $MaybePromise<S>,
): (iterable: $Wrappable<T>) => $Promise<T | N>;

declare function $findBestOr<N, T, S>(
  notFoundValue: N,
  comparer: (best: S, value: S) => boolean,
  mapper: (value: T, i: number) => $MaybePromise<S>,
  iterable: $Wrappable<T>,
): $Promise<T | N>;

export { $findBestOr };
