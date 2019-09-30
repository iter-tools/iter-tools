import { $Promise } from '../../../../generate/async.macro';

import assert from 'static-type-assert';
import { $Iterable } from '../../../internal/$iterable';
import { $find } from '../../..';

declare var Ø: never;

assert<$Promise<number | undefined>>(
  $find(Ø as (item: number) => any, Ø as $Iterable<number>),
);

assert<$Promise<2 | undefined>>(
  $find(Ø as (item: number) => item is 2, Ø as $Iterable<number>),
);
