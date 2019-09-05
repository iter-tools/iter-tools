import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $splitOnSubseq(
  subseq: $InputIterable<any>,
): <T = any>(iterable: $InputIterable<T>) => $GeneratorIterator<$GeneratorIterator<T>>;

declare function $splitOnSubseq<T = any>(
  subseq: $InputIterable<any>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<$GeneratorIterator<T>>;

export default $splitOnSubseq;
