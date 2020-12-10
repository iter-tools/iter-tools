import { IterableIterator } from '../../types/iterable';

declare function repeat<T>(value: T): IterableIterator<T>;

export { repeat };
