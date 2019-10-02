import { ResultIterable } from '../../internal/iterable';

declare function repeat<T>(obj: T, times?: number): ResultIterable<T>;

export default repeat;
