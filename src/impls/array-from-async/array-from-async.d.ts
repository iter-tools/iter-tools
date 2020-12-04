import { AsyncSourceIterable } from '../../types/async-iterable';

declare function arrayFromAsync<T>(source: AsyncSourceIterable<T>): Promise<Array<T>>;

export { arrayFromAsync };
