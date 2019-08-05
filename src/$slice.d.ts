import { $InputIterable, $GeneratorIterator } from './internal/$iterable';

declare function $slice<T = any>(opts: {
  readonly start?: number;
  readonly end?: number;
  readonly step?: number;
}): (iterable: $InputIterable<T>) => $GeneratorIterator<T>;

declare function $slice<T = any>(
  start?: number,
  end?: number,
  step?: number,
): (iterable: $InputIterable<T>) => $GeneratorIterator<T>;

declare function $slice<T = any>(
  opts: {
    readonly start?: number;
    readonly end?: number;
    readonly step?: number;
  },
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

declare function $slice<T = any>(start: number, iterable: $InputIterable<T>): $GeneratorIterator<T>;

declare function $slice<T = any>(
  start: number,
  end: number,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

declare function $slice<T = any>(
  start: number,
  end: number,
  step: number,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

export default $slice;
