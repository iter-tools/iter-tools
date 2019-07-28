import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $regexpExecIter(
  re: RegExp,
): (iterable: $InputIterable<string>) => $IterableIterator<string>;

declare function $regexpExecIter(
  re: RegExp,
  iterable: $InputIterable<string>,
): $IterableIterator<string>;

export default $regexpExecIter;
