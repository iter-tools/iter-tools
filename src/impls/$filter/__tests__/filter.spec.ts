/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$filter.spec.ts#1643837503059
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import assert from 'static-type-assert';

import { Iterable, IterableIterator } from '../../../types/iterable';
import { filter } from 'iter-tools-es';

declare const Ø: never;

assert<IterableIterator<string>>(
  filter(Ø as (value: string | number) => value is string, Ø as Iterable<string | number>),
);

assert<IterableIterator<number>>(
  filter(Ø as (value: string | number) => value is number, Ø as Iterable<string | number>),
);

assert<IterableIterator<0>>(
  filter(Ø as (value: string | number) => value is 0, Ø as Iterable<string | number>),
);

assert<IterableIterator<string | number>>(
  filter(
    Ø as (value: string | number) => boolean,
    Ø as Iterable<string | number> | null | undefined,
  ),
);
