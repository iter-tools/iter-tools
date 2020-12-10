/**
 * @generated-from ./$is-sorted.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable } from '../../types/async-iterable';

declare function asyncIsSorted(iterable: AsyncWrappable<any>): Promise<boolean>;

declare function asyncIsSorted<T>(
  comparator: (a: T, b: T) => number,
  iterable: AsyncWrappable<T>,
): Promise<boolean>;

export { asyncIsSorted };