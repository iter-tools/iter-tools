import { AsyncLoopable } from '../../types/async-iterable';

declare function notAsyncLoopable<T>(value: T | AsyncLoopable<any>): value is T;

export { notAsyncLoopable };
