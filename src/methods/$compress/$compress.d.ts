import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $compress<T = any>(
  iterable: $SourceIterable<T>,
  compress: $SourceIterable<boolean>,
): $ResultIterable<T>;

export default $compress;
