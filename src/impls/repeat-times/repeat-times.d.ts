import { IterableIterator } from '../../types/iterable';

declare function repeatTimes<T>(n: number, value: T): IterableIterator<T>;

export { repeatTimes };
