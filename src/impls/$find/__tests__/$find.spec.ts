import { $Promise } from '../../../../generate/async.macro.cjs';

import assert from 'static-type-assert';
import { $Iterable } from '../../../types/$iterable';
import { $find } from 'iter-tools-es';

declare const Ø: never;

assert<$Promise<number | undefined>>($find(Ø as (value: number) => any, Ø as $Iterable<number>));

assert<$Promise<2 | undefined>>($find(Ø as (value: number) => value is 2, Ø as $Iterable<number>));
