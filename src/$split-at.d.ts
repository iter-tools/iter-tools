import { GeneratorIterator as SyncGeneratorIterator } from './internal/iterable';
import { $IterableLike, $GeneratorIterator } from './internal/$iterable';

declare function $splitAt(
  position: number,
): <T = any>(iterable: $IterableLike<T>) => SyncGeneratorIterator<$GeneratorIterator<T>>;

declare function $splitAt<T = any>(
  position: number,
  iterable: $IterableLike<T>,
): SyncGeneratorIterator<$GeneratorIterator<T>>;

export default $splitAt;
