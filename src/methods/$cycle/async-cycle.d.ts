import { AsyncInputIterable, AsyncGeneratorIterator } from '../../internal/async-iterable';

declare function asyncCycle<T = any>(iterable: AsyncInputIterable<T>): AsyncGeneratorIterator<T>;

export default asyncCycle;
