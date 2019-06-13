import { GeneratorIterator as SyncGeneratorIterator } from './internal/iterable';
import { $IterableLike, $GeneratorIterator } from './internal/$iterable';

declare function $fork<T = any>(
  iterable: $IterableLike<T>,
): SyncGeneratorIterator<$GeneratorIterator<T>>;

declare function $fork<T = any>(
  n: number,
): (iterable: $IterableLike<T>) => SyncGeneratorIterator<$GeneratorIterator<T>>;

declare function $fork<T = any>(
  n: number,
  iterable: $IterableLike<T>,
): SyncGeneratorIterator<$GeneratorIterator<T>>;

export default $fork;
