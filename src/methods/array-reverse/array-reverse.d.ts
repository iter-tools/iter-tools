import { ResultIterable } from '../../types/iterable';

declare function arrayReverse<T>(source: Array<T> | null | undefined): ResultIterable<T>;

declare function arrayReverse(source: string): ResultIterable<string>;

export default arrayReverse;
