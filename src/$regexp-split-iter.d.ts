import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $regexpSplitIter(
  re: RegExp | string,
): (iterable: $InputIterable<string>) => $IterableIterator<string>;

declare function $regexpSplitIter(
  re: RegExp | string,
  iterable: $InputIterable<string>,
): $IterableIterator<string>;

export default $regexpSplitIter;
