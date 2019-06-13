import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $slice<T = any>(
  opts:
    | number
    | {
        readonly start?: number;
        readonly end?: number;
        readonly step?: number;
      },
): (iterable: $IterableLike<T>) => $IterableIterator<T>;

declare function $slice<T = any>(
  opts:
    | number
    | {
        readonly start?: number;
        readonly end?: number;
        readonly step?: number;
      },
  iterable: $IterableLike<T>,
): $IterableIterator<T>;

export default $slice;
