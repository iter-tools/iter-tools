import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $wrap<T>(source: $Wrappable<T>): $IterableIterator<T>;

export { $wrap };
