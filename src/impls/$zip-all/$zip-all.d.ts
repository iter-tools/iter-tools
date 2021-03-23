import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $zipAll<F, T, U>(
  options: { filler?: F },
  source1: $Wrappable<T>,
  source2: $Wrappable<U>,
): $IterableIterator<[T | F, U | F]>;

declare function $zipAll<T, U>(
  source1: $Wrappable<T>,
  source2: $Wrappable<U>,
): $IterableIterator<[T | undefined, U | undefined]>;

declare function $zipAll<F, T, U, V>(
  options: { filler?: F },
  source1: $Wrappable<T>,
  source2: $Wrappable<U>,
  source3: $Wrappable<V>,
): $IterableIterator<[T | F, U | F, V | F]>;

declare function $zipAll<T, U, V>(
  source1: $Wrappable<T>,
  source2: $Wrappable<U>,
  source3: $Wrappable<V>,
): $IterableIterator<[T | undefined, U | undefined, V | undefined]>;

declare function $zipAll<F, T>(
  options: { filler?: F },
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<Array<T | F>>;

declare function $zipAll<T>(
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<Array<T | undefined>>;

export { $zipAll };
