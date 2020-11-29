/**
 * @generated-from ./$find.spec.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import assert from 'static-type-assert';
import { AsyncIterable } from '../../../types/async-iterable';
import { asyncFind } from '@iter-tools/es';

declare const Ø: never;

assert<Promise<number | undefined>>(
  asyncFind(Ø as (value: number) => any, Ø as AsyncIterable<number>),
);

assert<Promise<2 | undefined>>(
  asyncFind(Ø as (value: number) => value is 2, Ø as AsyncIterable<number>),
);
