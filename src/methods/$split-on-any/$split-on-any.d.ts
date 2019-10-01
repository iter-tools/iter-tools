import { InputIterable as SyncInputIterable } from '../../internal/iterable';
import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $splitOnAny(
  values: SyncInputIterable<string>,
): (iterable: string) => $GeneratorIterator<string>;

declare function $splitOnAny(
  values: SyncInputIterable<any>,
): <T = any>(iterable: $InputIterable<T>) => $GeneratorIterator<$GeneratorIterator<T>>;

declare function $splitOnAny(
  values: SyncInputIterable<string>,
  iterable: string,
): $GeneratorIterator<string>;

declare function $splitOnAny<T = any>(
  values: SyncInputIterable<any>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<$GeneratorIterator<T>>;

export default $splitOnAny;
