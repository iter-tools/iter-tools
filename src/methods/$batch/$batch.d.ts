import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $batch(size: number): <T>(iterable: $InputIterable<T>) => $GeneratorIterator<T[]>;

declare function $batch<T = any>(
  size: number,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T[]>;

export default $batch;
