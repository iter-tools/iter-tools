import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split(
  separatorSeqs: Array<$SourceIterable<any>>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $split<T>(
  separatorSeqs: Array<$SourceIterable<any>>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
