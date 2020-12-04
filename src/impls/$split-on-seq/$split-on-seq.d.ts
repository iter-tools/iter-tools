import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnSeq(
  separatorSeq: $SourceIterable<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnSeq<T>(
  separatorSeq: $SourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export { $splitOnSeq };
