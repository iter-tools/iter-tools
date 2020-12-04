import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $wrap<T>(source: $SourceIterable<T>): $ResultIterable<T>;

export { $wrap };
