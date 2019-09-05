import { GeneratorIterator as SyncGeneratorIterator } from '../../internal/iterable';
import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $split<T = any>(
  iterable: $InputIterable<T>,
): $GeneratorIterator<SyncGeneratorIterator<T>>;

declare function $split(iterable: String): String;

export default $split;
