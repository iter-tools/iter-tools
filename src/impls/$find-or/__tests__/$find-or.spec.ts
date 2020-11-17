import { $Promise } from '../../../../generate/async.macro.cjs';

import assert from 'static-type-assert';
import { $Iterable } from '../../../types/$iterable';
import { $findOr } from '@iter-tools/es';

declare const Ø: never;

assert<$Promise<number | 0>>($findOr(Ø as 0, Ø as (item: number) => any, Ø as $Iterable<number>));

assert<$Promise<2 | 0>>($findOr(Ø as 0, Ø as (item: number) => item is 2, Ø as $Iterable<number>));
