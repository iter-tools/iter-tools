import { GeneratorIterator as SyncGeneratorIterator } from '../../internal/iterable';
import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $fork<T = any>(
  iterable: $InputIterable<T>,
): SyncGeneratorIterator<$GeneratorIterator<T>>;

declare function $fork<T = any>(
  n: number,
): (iterable: $InputIterable<T>) => SyncGeneratorIterator<$GeneratorIterator<T>>;

declare function $fork<T = any>(
  n: number,
  iterable: $InputIterable<T>,
): SyncGeneratorIterator<$GeneratorIterator<T>>;

export default $fork;
