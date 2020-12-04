import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $zipAll<F, T>(
  options: { filler?: F },
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<Array<T | F>>;

declare function $zipAll<T>(
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<Array<T | undefined>>;

export { $zipAll };
