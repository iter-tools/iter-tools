/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$batch.d.ts#1643837503045
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncBatch(
  size: number,
): <T>(source: AsyncWrappable<T>) => AsyncIterableIterator<T[]>;

declare function asyncBatch<T>(size: number, source: AsyncWrappable<T>): AsyncIterableIterator<T[]>;

export { asyncBatch };
