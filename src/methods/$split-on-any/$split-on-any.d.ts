import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnAny(
  separatorValues: Array<string>,
): (source: string) => $ResultIterable<string>;

declare function $splitOnAny(
  separatorValues: Array<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny(
  separatorValues: Array<string>,
  source: string,
): $ResultIterable<string>;

declare function $splitOnAny<T>(
  separatorValues: Array<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnAny;
