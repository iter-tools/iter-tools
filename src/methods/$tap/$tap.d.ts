import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<T>;

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

export default $tap;
