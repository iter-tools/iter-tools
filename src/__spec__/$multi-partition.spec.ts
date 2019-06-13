import assert from 'static-type-assert';

import { $Iterable, $IterableIterator, $Promise } from  '../internal/$iterable';
import { $multiPartition } from '..';

declare var Ø: never;

assert<IterableIterator<$IterableIterator<number>>>(
  $multiPartition(Ø as (x: number) => $Promise<number>, Ø as $Iterable<number>),
);

assert<IterableIterator<$IterableIterator<number>>>(
  $multiPartition(Ø as (x: number) => $Promise<number>)(Ø as $Iterable<number>),
);
