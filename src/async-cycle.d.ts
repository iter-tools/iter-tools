import { AsyncIterableLike } from './internal/async-iterable';

declare function asyncCycle<T = any>(iterable: AsyncIterableLike<T>): AsyncIterableIterator<T>;

export default asyncCycle;
