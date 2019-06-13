import assert from 'static-type-assert';

import { $Iterable, $IterableIterator } from  '../internal/$iterable';
import { $filter } from '..';

declare var Ø: never;

assert<$IterableIterator<string>>(
  $filter(
    Ø as (item: string | number) => item is string,
    Ø as $Iterable<string | number>,
  ),
);

assert<$IterableIterator<number>>(
  $filter(
    Ø as (item: string | number) => item is number,
    Ø as $Iterable<string | number>,
  ),
);

assert<$IterableIterator<0>>(
  $filter(Ø as (item: string | number) => item is 0, Ø as $Iterable<string | number>),
);
