/**
 * @generated-from ./$drop-while.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable, ResultIterable } from '../../types/iterable';

declare function dropWhile<T>(
  predicate: (item: T, i: number) => boolean,
): (source: SourceIterable<T>) => ResultIterable<T>;

declare function dropWhile<T>(
  predicate: (item: T, i: number) => boolean,
  source: SourceIterable<T>,
): ResultIterable<T>;

export default dropWhile;
