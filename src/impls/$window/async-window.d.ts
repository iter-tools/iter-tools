/**
 * @generated-from ./$window.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';

declare function asyncWindow<T>(
  size: number,
  source: AsyncWrappable<T>,
): AsyncIterableIterator<SyncIterableIterator<T>>;

declare function asyncWindow(
  size: number,
): <T>(source: AsyncWrappable<T>) => AsyncIterableIterator<SyncIterableIterator<T>>;

export { asyncWindow };
