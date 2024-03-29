/**
 * @generated-from ./$find-best.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable } from '../../types/async-iterable';

declare function asyncFindBest<T>(
  comparer: (best: T, value: T) => boolean,
): (iterable: AsyncWrappable<T>) => Promise<T | undefined>;

declare function asyncFindBest<T>(
  comparer: (best: T, value: T) => boolean,
  iterable: AsyncWrappable<T>,
): Promise<T | undefined>;

declare function asyncFindBest<T, S>(
  comparer: (best: S, value: S) => boolean,
  mapper: (value: T, i: number) => S | Promise<S>,
): (iterable: AsyncWrappable<T>) => Promise<T | undefined>;

declare function asyncFindBest<T, S>(
  comparer: (best: S, value: S) => boolean,
  mapper: (value: T, i: number) => S | Promise<S>,
  iterable: AsyncWrappable<T>,
): Promise<T | undefined>;

export { asyncFindBest };
