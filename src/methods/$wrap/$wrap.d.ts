import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $wrap<T = any>(iterable: $SourceIterable<T>): $ResultIterable<T>;

export default $wrap;
