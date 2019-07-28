import { $Promise, $InputIterable } from './internal/$iterable';

declare function $consume<T = any>(
  func: (item: T, i: number) => void,
): (iterable: $InputIterable<T>) => $Promise<void>;

declare function $consume<T = any>(
  func: (item: T, i: number) => void,
  iterable: $InputIterable<T>,
): $Promise<void>;

export default $consume;
