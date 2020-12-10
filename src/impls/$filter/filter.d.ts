/**
 * @generated-from ./$filter.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { Wrappable, IterableIterator } from '../../types/iterable';

declare function filter<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
): (source: Wrappable<T>) => IterableIterator<S>;

declare function filter<T>(
  predicate: (value: T, i: number) => boolean,
): (source: Wrappable<T>) => IterableIterator<T>;

declare function filter<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
  source: Wrappable<T>,
): IterableIterator<S>;

declare function filter<T>(
  predicate: (value: T, i: number) => boolean,
  source: Wrappable<T>,
): IterableIterator<T>;

export { filter };