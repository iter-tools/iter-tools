import { InputIterable } from './internal/iterable';

declare function cycle<T = any>(iterable: InputIterable<T>): IterableIterator<T>;

export default cycle;
