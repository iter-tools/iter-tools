import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $regexpExecIter(
  re: RegExp,
): (iterable: $IterableLike<string>) => $IterableIterator<string>;

declare function $regexpExecIter(
  re: RegExp,
  iterable: $IterableLike<string>,
): $IterableIterator<string>;

export default $regexpExecIter;
