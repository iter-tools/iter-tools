/**
 * @generated-from ./$find-or.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncSourceIterable } from '../../types/async-iterable';
declare function asyncFindOr<NF, S extends T, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => item is S,
): (iterable: AsyncSourceIterable<T>) => Promise<S | NF>;
declare function asyncFindOr<NF, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => boolean | Promise<boolean>,
): (iterable: AsyncSourceIterable<T>) => Promise<T | NF>;
declare function asyncFindOr<NF, S extends T, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => item is S,
  iterable: AsyncSourceIterable<T>,
): Promise<S | NF>;
declare function asyncFindOr<NF, T = any>(
  notFoundValue: NF,
  predicate: (item: T, i: number) => boolean | Promise<boolean>,
  iterable: AsyncSourceIterable<T>,
): Promise<T | NF>;
export default asyncFindOr;
