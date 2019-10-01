import { $MaybePromise } from '../../../generate/async.macro';

import { $GeneratorIterator } from '../../internal/$iterable';

declare function $execute<T, Args extends any[] = any[]>(
  func: (...args: Args) => $MaybePromise<T>,
  ...args: Args
): $GeneratorIterator<T>;

export default $execute;
