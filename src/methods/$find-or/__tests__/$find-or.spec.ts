import { $Promise } from '../../../../generate/async.macro';

import assert from 'static-type-assert';
import { $Iterable } from '../../../internal/$iterable';
import { $findOr } from '../../..';

declare const Ø: never;

assert<$Promise<number | 0>>($findOr(Ø as 0, Ø as (item: number) => any, Ø as $Iterable<number>));

assert<$Promise<2 | 0>>($findOr(Ø as 0, Ø as (item: number) => item is 2, Ø as $Iterable<number>));
