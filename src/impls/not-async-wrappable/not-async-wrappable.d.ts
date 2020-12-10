import { AsyncWrappable } from '../../types/async-iterable';

declare function notAsyncWrappable<T>(value: T | AsyncWrappable<any>): value is T;

export { notAsyncWrappable };
