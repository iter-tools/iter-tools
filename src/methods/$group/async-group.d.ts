/**
 * @generated-from ./$group.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncGroup<T>(
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<[T, AsyncResultIterable<T>]>;

export default asyncGroup;
