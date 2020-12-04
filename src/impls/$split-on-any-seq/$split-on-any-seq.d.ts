import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnAnySeq(
  separatorSeqs: Array<$SourceIterable<any>>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAnySeq<T>(
  separatorSeqs: Array<$SourceIterable<any>>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export { $splitOnAnySeq };
