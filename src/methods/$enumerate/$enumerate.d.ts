import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $enumerate<T = any>(
  iterable: $InputIterable<T>,
  start?: number,
): $GeneratorIterator<[number, T]>;

export default $enumerate;
