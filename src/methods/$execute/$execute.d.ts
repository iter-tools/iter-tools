import { $MaybePromise } from '../../../generate/async.macro';

import { $ResultIterable } from '../../types/$iterable';

declare function $execute<T, O, Args extends Array<O>>(
  func: (...args: Args) => $MaybePromise<T>,
  ...args: Args
): $ResultIterable<T>;

export default $execute;
