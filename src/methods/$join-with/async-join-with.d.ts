/**
 * @generated-from ./$join-with.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';
declare function asyncJoinWith<W, T = any>(
  value: W,
  iterable: AsyncSourceIterable<AsyncSourceIterable<T>>,
): AsyncResultIterable<T | W>;
declare function asyncJoinWith<W>(
  value: W,
): <T = any>(iterable: AsyncSourceIterable<AsyncSourceIterable<T>>) => AsyncResultIterable<T | W>;
export default asyncJoinWith;
