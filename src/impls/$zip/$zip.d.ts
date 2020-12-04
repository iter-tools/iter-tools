import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $zip<T>(...sources: Array<$SourceIterable<T>>): $ResultIterable<T[]>;

export { $zip };
