import { AsyncWrappable } from '../../types/async-iterable';

declare function isAsyncWrappable(value: any): value is AsyncWrappable<unknown>;

export { isAsyncWrappable };
