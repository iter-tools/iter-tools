import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $joinWith<W, T = any>(
  value: W,
  iterable: $InputIterable<$InputIterable<T>>,
): $GeneratorIterator<T | W>;

declare function $joinWith<W>(
  value: W,
): <T = any>(iterable: $InputIterable<$InputIterable<T>>) => $GeneratorIterator<T | W>;

export default $joinWith;
