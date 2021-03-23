import assert from 'static-type-assert';

import { $IterableIterator } from '../../../types/$iterable';
import { $zip } from 'iter-tools-es';

declare const Ø: never;

assert<$IterableIterator<[number, string]>>($zip(Ø as [0, 1, 2], Ø as ['a', 'b', 'c']));
assert<$IterableIterator<[number, string, boolean]>>(
  $zip(Ø as [0, 1, 2], Ø as ['a', 'b', 'c'], Ø as [true, false, true]),
);
