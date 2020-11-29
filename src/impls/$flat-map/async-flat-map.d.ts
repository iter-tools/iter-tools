/**
 * @generated-from ./$flat-map.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncFlatMap<O, T>(
  func: (value: T, i: number) => AsyncSourceIterable<O> | Promise<AsyncSourceIterable<O>>,
): (source: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T>(
  func: (value: T, i: number) => AsyncSourceIterable<O> | Promise<AsyncSourceIterable<O>>,
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncFlatMap;
