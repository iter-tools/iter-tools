import { AsyncWrappable } from '../../types/async-iterable';

declare function __method__<T>(
  iterable: AsyncWrappable<T>,
): Promise<T>;

export { __method__ };
