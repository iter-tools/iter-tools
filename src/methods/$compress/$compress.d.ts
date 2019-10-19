import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $compress<T>(
  source: $SourceIterable<T>,
  compress: $SourceIterable<boolean>,
): $ResultIterable<T>;

export default $compress;
