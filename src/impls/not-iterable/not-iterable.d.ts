import { Iterable } from '../../types/iterable';

declare function notIterable<T>(value: T | Iterable<any>): value is T;

export { notIterable };
