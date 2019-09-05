import { InputIterable as SyncInputIterable } from '../../internal/iterable';
import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $joinWithSubseq<W, T = any>(
  subseq: SyncInputIterable<W>,
  iterable: $InputIterable<$InputIterable<T>>,
): $GeneratorIterator<T | W>;

declare function $joinWithSubseq<W>(
  subseq: SyncInputIterable<W>,
): <T = any>(iterable: $InputIterable<$InputIterable<T>>) => $GeneratorIterator<T | W>;

export default $joinWithSubseq;
