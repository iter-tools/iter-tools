import { $Promise, $IterableLike } from './internal/$iterable';

declare function $consume<T = any>(
  func: (item: T, i: number) => void,
): (iterable: $IterableLike<T>) => $Promise<void>;

declare function $consume<T = any>(
  func: (item: T, i: number) => void,
  iterable: $IterableLike<T>,
): $Promise<void>;

export default $consume;
