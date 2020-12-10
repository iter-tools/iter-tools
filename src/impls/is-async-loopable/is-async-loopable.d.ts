import { AsyncLoopable } from '../../types/async-iterable';

declare function isAsyncLoopable(value: any): value is AsyncLoopable<unknown>;

export { isAsyncLoopable };
