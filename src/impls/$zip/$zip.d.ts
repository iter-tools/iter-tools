import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $zip<T>(...sources: Array<$Wrappable<T>>): $IterableIterator<T[]>;

export { $zip };
