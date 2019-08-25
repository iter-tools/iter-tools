import { GeneratorIterator as SyncGeneratorIterator } from '../../internal/iterable';
import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $splitAt(
  position: number,
): <T = any>(iterable: $InputIterable<T>) => SyncGeneratorIterator<$GeneratorIterator<T>>;

declare function $splitAt<T = any>(
  position: number,
  iterable: $InputIterable<T>,
): SyncGeneratorIterator<$GeneratorIterator<T>>;

export default $splitAt;
