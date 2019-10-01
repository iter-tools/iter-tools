import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

// prettier-ignore
declare function $split(
  value: string
): (iterable: string) => $GeneratorIterator<string>;

declare function $split(
  value: any,
): <T = any>(iterable: $InputIterable<T>) => $GeneratorIterator<$GeneratorIterator<T>>;

// prettier-ignore
declare function $split(
  value: string,
  iterable: string
): $GeneratorIterator<string>;

declare function $split<T = any>(
  value: any,
  iterable: $InputIterable<T>,
): $GeneratorIterator<$GeneratorIterator<T>>;

export default $split;
