import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $compress<T>(
  source: $SourceIterable<T>,
  included: $SourceIterable<boolean>,
): $ResultIterable<T>;

export default $compress;
