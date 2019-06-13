import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $zipAll<T = any>(
  ...iterables: Array<$IterableLike<T>>
): $IterableIterator<Array<T | undefined>>;

export default $zipAll;
