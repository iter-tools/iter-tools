/**
 * @generated-from ./$take-sorted.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncTakeSorted<T>(iterable: AsyncWrappable<T>): AsyncIterableIterator<T>;

declare function asyncTakeSorted<T>(
  n: number,
): (source: AsyncWrappable<T>) => AsyncIterableIterator<T>;

declare function asyncTakeSorted<T>(
  n: number,
  func: (a: T, b: T) => number,
): (source: AsyncWrappable<T>) => AsyncIterableIterator<T>;

declare function asyncTakeSorted<T>(
  func: (a: T, b: T) => number,
): (source: AsyncWrappable<T>) => AsyncIterableIterator<T>;

declare function asyncTakeSorted<T>(n: number, source: AsyncWrappable<T>): AsyncIterableIterator<T>;

declare function asyncTakeSorted<T>(
  n: number,
  func: (a: T, b: T) => number,
  source: AsyncWrappable<T>,
): AsyncIterableIterator<T>;

declare function asyncTakeSorted<T>(
  func: (a: T, b: T) => number,
  source: AsyncWrappable<T>,
): AsyncIterableIterator<T>;

export { asyncTakeSorted };