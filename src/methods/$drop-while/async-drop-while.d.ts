/**
 * @generated-from ./$drop-while.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';
declare function asyncDropWhile<T>(
  predicate: (item: T, i: number) => boolean | Promise<boolean>,
): (source: AsyncSourceIterable<T>) => AsyncResultIterable<T>;
declare function asyncDropWhile<T>(
  predicate: (item: T, i: number) => boolean | Promise<boolean>,
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;
export default asyncDropWhile;
