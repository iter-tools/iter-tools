/**
 * @generated-from ./$find.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable } from '../../types/iterable';
declare function find<S extends T, T>(
  predicate: (item: T, i: number) => item is S,
): (iterable: SourceIterable<T>) => S | undefined;
declare function find<T>(
  predicate: (item: T, i: number) => boolean,
): (iterable: SourceIterable<T>) => T | undefined;
declare function find<S extends T, T>(
  predicate: (item: T, i: number) => item is S,
  iterable: SourceIterable<T>,
): S | undefined;
declare function find<T>(
  predicate: (item: T, i: number) => boolean,
  iterable: SourceIterable<T>,
): T | undefined;
export default find;
