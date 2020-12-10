import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $wrap<T>(array: $Wrappable<T>): $IterableIterator<T>;
declare function $wrap(string: string): $IterableIterator<string>;

declare function $wrapDeep<T>(
  array: $Wrappable<T | $Wrappable<T | $Wrappable<T>>>,
): $IterableIterator<$IterableIterator<T>>;

export { $wrap, $wrapDeep };
