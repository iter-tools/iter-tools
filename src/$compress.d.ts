import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $compress<T = any>(
  iterable: $InputIterable<T>,
  compress: $InputIterable<boolean>,
): $IterableIterator<T>;

export default $compress;
