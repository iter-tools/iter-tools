import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnSubseq(
  subseq: $SourceIterable<any>,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnSubseq<T = any>(
  subseq: $SourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnSubseq;
