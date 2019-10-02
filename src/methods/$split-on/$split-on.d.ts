import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// prettier-ignore
declare function $split(
  value: string
): (source: string) => $ResultIterable<string>;

declare function $split(
  value: any,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

// prettier-ignore
declare function $split(
  value: string,
  source: string
): $ResultIterable<string>;

declare function $split<T = any>(
  value: any,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
