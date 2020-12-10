import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $slice<T>(opts: {
  readonly start?: number;
  readonly end?: number;
  readonly step?: number;
}): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $slice<T>(
  start?: number,
  end?: number,
  step?: number,
): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $slice<T>(
  opts: {
    readonly start?: number;
    readonly end?: number;
    readonly step?: number;
  },
  source: $Wrappable<T>,
): $IterableIterator<T>;

declare function $slice<T>(start: number, source: $Wrappable<T>): $IterableIterator<T>;

declare function $slice<T>(start: number, end: number, source: $Wrappable<T>): $IterableIterator<T>;

declare function $slice<T>(
  start: number,
  end: number,
  step: number,
  source: $Wrappable<T>,
): $IterableIterator<T>;

export { $slice };
