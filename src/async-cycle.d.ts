import { AsyncInputIterable } from './internal/async-iterable';

declare function asyncCycle<T = any>(iterable: AsyncInputIterable<T>): AsyncIterableIterator<T>;

export default asyncCycle;
