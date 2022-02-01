/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$bisect.d.ts#1643837503046
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';
import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncBisect<T>(
  idx: number,
): (source: AsyncWrappable<T>) => SyncIterableIterator<AsyncIterableIterator<T>>;

declare function asyncBisect<T>(
  predicate: (value: T, i: number) => any,
): (source: AsyncWrappable<T>) => SyncIterableIterator<AsyncIterableIterator<T>>;

declare function asyncBisect<T>(
  idx: number,
  source: AsyncWrappable<T>,
): SyncIterableIterator<AsyncIterableIterator<T>>;

declare function asyncBisect<T>(
  predicate: (value: T, i: number) => any,
  source: AsyncWrappable<T>,
): SyncIterableIterator<AsyncIterableIterator<T>>;

export { asyncBisect };
