import { Wrappable } from '../../types/iterable';

declare function notWrappable<T>(value: T | Wrappable<any>): value is T;

export { notWrappable };
