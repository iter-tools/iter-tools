import { IterableIterator } from '../../types/iterable';

declare function arrayReverse<T>(source: Array<T> | null | undefined): IterableIterator<T>;

declare function arrayReverse(source: string): IterableIterator<string>;

export { arrayReverse };
