/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$split-when.d.ts#1643837503097
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncSplitWhen<T>(
  predicate: (value: T, i: number) => any,
): (source: AsyncWrappable<T>) => AsyncIterableIterator<AsyncIterableIterator<T>>;

declare function asyncSplitWhen<T>(
  predicate: (value: T, i: number) => any,
  source: AsyncWrappable<T>,
): AsyncIterableIterator<AsyncIterableIterator<T>>;

export { asyncSplitWhen };
