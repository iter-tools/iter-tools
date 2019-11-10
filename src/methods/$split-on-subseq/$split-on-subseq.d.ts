import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnSubseq(
  separatorSubseq: $SourceIterable<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnSubseq<T>(
  separatorSubseq: $SourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnSubseq;
