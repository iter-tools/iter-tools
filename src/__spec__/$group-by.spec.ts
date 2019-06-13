import assert from 'static-type-assert';

import { $Iterable, $IterableIterator, $Promise } from  '../internal/$iterable';
import { $groupBy } from '..';

declare var Ø: never;

assert<$IterableIterator<[string, $IterableIterator<string>]>>(
  $groupBy(null)(Ø as string),
);

assert<$IterableIterator<[number, $IterableIterator<number>]>>(
  $groupBy(null)(Ø as $Iterable<number>),
);

assert<$IterableIterator<[string, $IterableIterator<string>]>>(
  $groupBy(null, Ø as string),
);

assert<$IterableIterator<[number, $IterableIterator<number>]>>(
  $groupBy(null, Ø as $Iterable<number>),
);

assert<$IterableIterator<[string, $IterableIterator<number>]>>(
  $groupBy(Ø as (x: number) => $Promise<string>)(Ø as $Iterable<number>),
);

assert<$IterableIterator<[string, $IterableIterator<number>]>>(
  $groupBy(Ø as (x: number) => $Promise<string>, Ø as $Iterable<number>),
);
