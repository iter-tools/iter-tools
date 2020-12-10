import { AsyncWrappable } from '../../types/async-iterable';

declare function arrayFromAsync<T>(source: AsyncWrappable<T>): Promise<Array<T>>;

export { arrayFromAsync };
