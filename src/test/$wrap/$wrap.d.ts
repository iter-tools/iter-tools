import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $wrap<T>(array: $SourceIterable<T>): $ResultIterable<T>;
declare function $wrap(string: string): $ResultIterable<string>;

declare function $wrapDeep<T>(
  array: $SourceIterable<T | $SourceIterable<T | $SourceIterable<T>>>,
): $ResultIterable<$ResultIterable<T>>;

export { $wrap, $wrapDeep };
