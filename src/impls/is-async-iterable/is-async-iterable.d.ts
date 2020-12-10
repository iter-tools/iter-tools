import { AsyncIterable } from '../../types/async-iterable';

declare function isAsyncIterable(value: any): value is AsyncIterable<unknown>;

export { isAsyncIterable };
