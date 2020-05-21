/**
 * @generated-from ./$find-or.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable } from '../../types/iterable';
declare function findOr<N, S extends T, T>(
  notFoundValue: N,
  predicate: (item: T, i: number) => item is S,
): (iterable: SourceIterable<T>) => S | N;
declare function findOr<N, T>(
  notFoundValue: N,
  predicate: (item: T, i: number) => boolean,
): (iterable: SourceIterable<T>) => T | N;
declare function findOr<N, S extends T, T>(
  notFoundValue: N,
  predicate: (item: T, i: number) => item is S,
  iterable: SourceIterable<T>,
): S | N;
declare function findOr<N, T>(
  notFoundValue: N,
  predicate: (item: T, i: number) => boolean,
  iterable: SourceIterable<T>,
): T | N;
export default findOr;
