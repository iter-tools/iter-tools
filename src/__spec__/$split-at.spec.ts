import assert from 'static-type-assert';

import { $Iterable, $IterableIterator } from  '../internal/$iterable';
import { $splitAt } from '..';

declare var Ø: never;

assert<IterableIterator<$IterableIterator<number>>>(
  $splitAt(3, Ø as $Iterable<number>),
);

assert<IterableIterator<$IterableIterator<number>>>(
  $splitAt(3)(Ø as $Iterable<number>),
);
