import { ResultIterable } from '../../types/iterable';

declare function repeatTimes<T>(n: number, value: T): ResultIterable<T>;

export default repeatTimes;
