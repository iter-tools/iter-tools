/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$interpose-seq.d.ts#1643837503075
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncInterposeSeq<V>(
  seq: AsyncWrappable<V>,
): <T>(source: AsyncWrappable<T>) => AsyncIterableIterator<T | V>;

declare function asyncInterposeSeq<V, T>(
  seq: AsyncWrappable<V>,
  source: AsyncWrappable<T>,
): AsyncIterableIterator<T | V>;

export { asyncInterposeSeq };
