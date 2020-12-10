import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $tap<T>(
  callback: (value: T, i: number) => $MaybePromise<any>,
): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $tap<T>(
  callback: (value: T, i: number) => $MaybePromise<any>,
  source: $Wrappable<T>,
): $IterableIterator<T>;

export { $tap };
