import { $SourceIterable, $ResultIterable, $ResultSubseqIterable } from '../../types/$iterable';

// $ omitted to keep this signature from applying to async
// prettier-ignore
declare function split(
  separatorValue: string
): (source: string) => $ResultIterable<string>;

declare function $split(
  separatorValue: any,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultSubseqIterable<T>>;

// prettier-ignore
declare function $split(
  separatorValue: string,
  source: string
): $ResultIterable<string>;

declare function $split<T>(
  separatorValue: any,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultSubseqIterable<T>>;

export default $split;
