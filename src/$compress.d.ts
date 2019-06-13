import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $compress<T = any>(
  iterable: $IterableLike<T>,
  compress: $IterableLike<boolean>,
): $IterableIterator<T>;

export default $compress;
