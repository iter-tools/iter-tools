import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<O>;

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<O>;

export default $map;
