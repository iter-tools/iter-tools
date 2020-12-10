import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $cycleTimes<T>(n: number, source: $Wrappable<T>): $IterableIterator<T>;

declare function $cycleTimes<T>(n: number): (source: $Wrappable<T>) => $IterableIterator<T>;

export { $cycleTimes };
