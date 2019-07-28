import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $zipAll<T = any>(
  ...iterables: Array<$InputIterable<T>>
): $IterableIterator<Array<T | undefined>>;

export default $zipAll;
