import { AsyncInputIterable, AsyncGeneratorIterator } from './internal/async-iterable';

declare function asyncBuffer<T>(
  n: number,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<T>;

declare function asyncBuffer<T>(
  n: number,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<T>;

export default asyncBuffer;
