import { ResultIterable } from '../../types/iterable';

declare function repeat<T>(n: number, item: T): ResultIterable<T>;

declare function repeat<T>(item: T): ResultIterable<T>;

export default repeat;
