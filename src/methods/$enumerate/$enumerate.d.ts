import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $enumerate<T = any>(iterable: $InputIterable<T>): $GeneratorIterator<[number, T]>;

declare function $enumerate<T = any>(
  firstIdx: number,
  iterable: $InputIterable<T>,
): $GeneratorIterator<[number, T]>;

declare function $enumerate(
  firstIdx: number,
): <T = any>(iterable: $InputIterable<T>) => $GeneratorIterator<[number, T]>;

export default $enumerate;
