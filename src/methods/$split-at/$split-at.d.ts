import { $SourceIterable, $ResultSubseqIterable } from '../../types/$iterable';

declare function $splitAt(
  idx: number,
): <T>(source: $SourceIterable<T>) => [$ResultSubseqIterable<T>, $ResultSubseqIterable<T>];

declare function $splitAt<T>(
  idx: number,
  source: $SourceIterable<T>,
): [$ResultSubseqIterable<T>, $ResultSubseqIterable<T>];

export default $splitAt;
