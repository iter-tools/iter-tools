/* tslint:disable unified-signatures */

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// prettier-ignore
declare function $collate<T>(
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T>(
  step: number,
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T>(
  start: number,
  step: number,
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T>(
  comparator: (a: T, b: T) => number,
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T>(
  options: { start?: number; step?: number },
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<T>;

export default $collate;
