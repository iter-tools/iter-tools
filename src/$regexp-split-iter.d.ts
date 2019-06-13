import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $regexpSplitIter(
  re: RegExp | string,
): (iterable: $IterableLike<string>) => $IterableIterator<string>;

declare function $regexpSplitIter(
  re: RegExp | string,
  iterable: $IterableLike<string>,
): $IterableIterator<string>;

export default $regexpSplitIter;
