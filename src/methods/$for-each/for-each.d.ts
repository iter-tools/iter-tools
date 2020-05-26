/**
 * @generated-from ./$for-each.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable } from '../../types/iterable';

declare function forEach<T>(
  callback: (item: T, i: number) => void,
): (iterable: SourceIterable<T>) => void;

declare function forEach<T>(
  callback: (item: T, i: number) => void,
  iterable: SourceIterable<T>,
): void;

export default forEach;
