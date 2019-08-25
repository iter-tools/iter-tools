import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $regexpExecIter(
  re: RegExp,
): (iterable: $InputIterable<string>) => $GeneratorIterator<string>;

declare function $regexpExecIter(
  re: RegExp,
  iterable: $InputIterable<string>,
): $GeneratorIterator<string>;

export default $regexpExecIter;
