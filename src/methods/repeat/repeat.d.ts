import { ResultIterable } from '../../types/iterable';

declare function repeat<T>(item: T, times?: number): ResultIterable<T>;

export default repeat;
