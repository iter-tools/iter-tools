import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $interpose<I>(
  interposeItem: I,
): <T = any>(iterable: $InputIterable<T>) => $GeneratorIterator<T | I>;

declare function $interpose<I, T = any>(
  interposeItem: I,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T | I>;

export default $interpose;
