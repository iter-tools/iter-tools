import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $compress<T = any>(
  iterable: $InputIterable<T>,
  compress: $InputIterable<boolean>,
): $GeneratorIterator<T>;

export default $compress;
