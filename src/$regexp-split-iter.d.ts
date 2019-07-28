import { $InputIterable, $GeneratorIterator } from './internal/$iterable';

declare function $regexpSplitIter(
  re: RegExp | string,
): (iterable: $InputIterable<string>) => $GeneratorIterator<string>;

declare function $regexpSplitIter(
  re: RegExp | string,
  iterable: $InputIterable<string>,
): $GeneratorIterator<string>;

export default $regexpSplitIter;
