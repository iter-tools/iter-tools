import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $wrap<T = any>(source: $SourceIterable<T>): $ResultIterable<T>;

export default $wrap;
