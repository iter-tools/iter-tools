/**
 * @generated-from ./$split-with.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncSplitWith<T>(
  predicate: (value: T, i: number) => any,
): (source: AsyncSourceIterable<T>) => AsyncResultIterable<AsyncResultIterable<T>>;

declare function asyncSplitWith<T>(
  predicate: (value: T, i: number) => any,
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<AsyncResultIterable<T>>;

export { asyncSplitWith };
