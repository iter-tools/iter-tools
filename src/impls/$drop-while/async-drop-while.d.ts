/**
 * @generated-from ./$drop-while.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncDropWhile<T>(
  predicate: (value: T, i: number) => boolean | Promise<boolean>,
): (source: AsyncWrappable<T>) => AsyncIterableIterator<T>;

declare function asyncDropWhile<T>(
  predicate: (value: T, i: number) => boolean | Promise<boolean>,
  source: AsyncWrappable<T>,
): AsyncIterableIterator<T>;

export { asyncDropWhile };
