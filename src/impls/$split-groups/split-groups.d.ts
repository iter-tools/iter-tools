/**
 * @generated-from ./$split-groups.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable, ResultIterable } from '../../types/iterable';

declare function splitGroups<T>(source: SourceIterable<T>): ResultIterable<[T, ResultIterable<T>]>;

declare function splitGroups<K, T>(
  key: (value: T, i: number) => K,
): (source: SourceIterable<T>) => ResultIterable<[K, ResultIterable<T>]>;

declare function splitGroups<K, T>(
  key: (value: T, i: number) => K,
  source: SourceIterable<T>,
): ResultIterable<[K, ResultIterable<T>]>;

export { splitGroups };
