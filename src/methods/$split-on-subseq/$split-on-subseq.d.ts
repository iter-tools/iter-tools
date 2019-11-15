import { $SourceIterable, $ResultIterable, $ResultSubseqIterable } from '../../types/$iterable';

declare function $splitOnSubseq(
  separatorSubseq: $SourceIterable<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultSubseqIterable<T>>;

declare function $splitOnSubseq<T>(
  separatorSubseq: $SourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultSubseqIterable<T>>;

export default $splitOnSubseq;
