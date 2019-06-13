import { IterableLike } from './internal/iterable';

declare function cycle<T = any>(iterable: IterableLike<T>): IterableIterator<T>;

export default cycle;
