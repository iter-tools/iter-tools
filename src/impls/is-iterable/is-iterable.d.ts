import { Iterable } from '../../types/iterable';

declare function isIterable(value: any): value is Iterable<unknown>;

export { isIterable };
