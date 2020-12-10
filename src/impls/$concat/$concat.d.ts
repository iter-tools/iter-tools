import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $concat<T>(...sources: Array<$Wrappable<T>>): $IterableIterator<T>;

export { $concat };
