import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split(
  separatorSubseqs: Array<$SourceIterable<any>>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $split<T>(
  separatorSubseqs: Array<$SourceIterable<any>>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
