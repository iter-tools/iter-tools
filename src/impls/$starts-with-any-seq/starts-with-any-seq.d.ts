/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$starts-with-any-seq.d.ts#1643837503100
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { Wrappable } from '../../types/iterable';

declare function startsWithAnySeq(
  same: (a: any, b: any) => boolean,
  seqs: Array<Wrappable<any>>,
): (iterable: Wrappable<any>) => boolean;

declare function startsWithAnySeq(
  same: (a: any, b: any) => boolean,
  seqs: Array<Wrappable<any>>,
  iterable: Wrappable<any>,
): boolean;

declare function startsWithAnySeq(seqs: Array<Wrappable<any>>, iterable: Wrappable<any>): boolean;

export { startsWithAnySeq };
