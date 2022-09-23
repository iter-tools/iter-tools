import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $findBest<T>(
  comparer: (value: T, i: number) => boolean,
): (iterable: $Wrappable<T>) => $Promise<T | undefined>;

declare function $findBest<T>(
  comparer: (value: T, i: number) => boolean,
  iterable: $Wrappable<T>,
): $Promise<T | undefined>;

declare function $findBest<T, S>(
  comparer: (value: S, i: number) => boolean,
  mapper: (value: T, i: number) => $MaybePromise<S>,
): (iterable: $Wrappable<T>) => $Promise<T | undefined>;

declare function $findBest<T, S>(
  comparer: (value: S, i: number) => boolean,
  mapper: (value: T, i: number) => $MaybePromise<S>,
  iterable: $Wrappable<T>,
): $Promise<T | undefined>;

export { $findBest };
