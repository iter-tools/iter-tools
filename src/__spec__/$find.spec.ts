import assert from 'static-type-assert';

import { $Iterable, $Promise } from  '../internal/$iterable';
import { $find } from '..';

declare var Ø: never;

assert<$Promise<2 | undefined>>(
  $find(Ø as (item: number) => item is 2, Ø as $Iterable<number>),
);
