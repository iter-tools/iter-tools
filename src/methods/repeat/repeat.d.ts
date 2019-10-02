import { ResultIterable } from '../../types/iterable';

declare function repeat<T>(obj: T, times?: number): ResultIterable<T>;

export default repeat;
