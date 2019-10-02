/* tslint:disable unified-signatures */

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// prettier-ignore
declare function $collate<T = any>(
  ...iterables: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T = any>(
  step: number,
  ...iterables: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T = any>(
  start: number,
  step: number,
  ...iterables: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T = any>(
  comparator: (a: T, b: T) => number,
  ...iterables: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T = any>(
  options: { start?: number; step?: number },
  ...iterables: Array<$SourceIterable<T>>
): $ResultIterable<T>;

export default $collate;
