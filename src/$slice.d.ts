import { $InputIterable, $GeneratorIterator } from './internal/$iterable';

declare function $slice<T = any>(
  opts:
    | number
    | {
        readonly start?: number;
        readonly end?: number;
        readonly step?: number;
      },
): (iterable: $InputIterable<T>) => $GeneratorIterator<T>;

declare function $slice<T = any>(
  opts:
    | number
    | {
        readonly start?: number;
        readonly end?: number;
        readonly step?: number;
      },
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

export default $slice;
