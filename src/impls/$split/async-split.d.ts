/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$split.d.ts#1643837503098
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';
import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncSplit<T>(
  source: AsyncWrappable<T>,
): AsyncIterableIterator<SyncIterableIterator<T>>;

export { asyncSplit };
