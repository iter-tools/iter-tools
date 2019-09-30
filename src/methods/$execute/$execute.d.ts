import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $execute<T, Args extends any[] = any[]>(
  func: (...args: Args) => $MaybePromise<T>,
  ...args: Args
): $GeneratorIterator<T>;

export default $execute;
