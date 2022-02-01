/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$equal.d.ts#1643837503057
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { AsyncWrappable } from '../../types/async-iterable';

declare function asyncEqual(
  same: (a: any, b: any) => boolean,
): (...seqs: Array<AsyncWrappable<any>>) => (iterable: AsyncWrappable<any>) => Promise<boolean>;

declare function asyncEqual(
  same: (a: any, b: any) => boolean,
  ...seqs: Array<AsyncWrappable<any>>
): (iterable: AsyncWrappable<any>) => Promise<boolean>;

declare function asyncEqual(
  ...seqs: Array<AsyncWrappable<any>>
): (iterable: AsyncWrappable<any>) => Promise<boolean>;

export { asyncEqual };
