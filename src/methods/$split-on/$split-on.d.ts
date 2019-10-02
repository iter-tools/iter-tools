import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// prettier-ignore
declare function $split(
  value: string
): (iterable: string) => $ResultIterable<string>;

declare function $split(
  value: any,
): <T = any>(iterable: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

// prettier-ignore
declare function $split(
  value: string,
  iterable: string
): $ResultIterable<string>;

declare function $split<T = any>(
  value: any,
  iterable: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
