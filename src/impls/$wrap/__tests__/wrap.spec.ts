/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$wrap.spec.ts#1643837503117
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import assert from 'static-type-assert';

import { IterableIterator } from '../../../types/iterable';
import { wrap } from 'iter-tools-es';

declare const Ø: never;

assert<IterableIterator<1 | 2 | 3>>(wrap(Ø as [1, 2, 3]));
