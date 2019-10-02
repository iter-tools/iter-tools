import { AsyncSourceIterable, AsyncResultIterable } from '../../internal/async-iterable';

declare function asyncCycle<T = any>(iterable: AsyncSourceIterable<T>): AsyncResultIterable<T>;

export default asyncCycle;
