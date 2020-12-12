import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitWhen<T>(
  predicate: (value: T, i: number) => any,
): (source: $Wrappable<T>) => $IterableIterator<$IterableIterator<T>>;

declare function $splitWhen<T>(
  predicate: (value: T, i: number) => any,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

export { $splitWhen };
