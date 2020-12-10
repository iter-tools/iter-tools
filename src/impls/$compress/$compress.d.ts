import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $compress<T>(
  source: $Wrappable<T>,
  included: $Wrappable<boolean>,
): $IterableIterator<T>;

export { $compress };
