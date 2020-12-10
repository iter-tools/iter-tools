import { Loopable } from '../../types/iterable';

declare function notLoopable<T>(value: T | Loopable<any>): value is T;

export { notLoopable };
