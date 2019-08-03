/* tslint:disable unified-signatures */

import { $InputIterable, $GeneratorIterator } from './internal/$iterable';

// prettier-ignore
declare function $collate<T = any>(
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<T>;

declare function $collate<T = any>(
  step: number,
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<T>;

declare function $collate<T = any>(
  start: number,
  step: number,
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<T>;

declare function $collate<T = any>(
  comparator: (a: T, b: T) => number,
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<T>;

declare function $collate<T = any>(
  options: { start?: number; step?: number },
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<T>;

export default $collate;
