import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $zipAll<F, T = any>(
  options: { filler?: F },
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<Array<T | F>>;

declare function $zipAll<T = any>(
  ...iterables: Array<$InputIterable<T>>
): $GeneratorIterator<Array<T | undefined>>;

export default $zipAll;
