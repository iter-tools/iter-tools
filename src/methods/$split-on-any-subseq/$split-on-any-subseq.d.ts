import { InputIterable as SyncInputIterable } from '../../internal/iterable';
import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $split(
  subseqs: SyncInputIterable<$InputIterable<any>>,
): <T = any>(iterable: $InputIterable<T>) => $GeneratorIterator<$GeneratorIterator<T>>;

declare function $split<T = any>(
  subseqs: SyncInputIterable<$InputIterable<any>>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<$GeneratorIterator<T>>;

export default $split;
