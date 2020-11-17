import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function nullOrAsync<T>(
  source: AsyncSourceIterable<T>,
): Promise<null | AsyncResultIterable<T>>;

export default nullOrAsync;
