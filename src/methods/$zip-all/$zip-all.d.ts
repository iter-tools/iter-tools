import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $zipAll<F, T = any>(
  options: { filler?: F },
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<Array<T | F>>;

declare function $zipAll<T = any>(
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<Array<T | undefined>>;

export default $zipAll;
