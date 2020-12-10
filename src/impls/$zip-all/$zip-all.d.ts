import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $zipAll<F, T>(
  options: { filler?: F },
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<Array<T | F>>;

declare function $zipAll<T>(
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<Array<T | undefined>>;

export { $zipAll };
