import assert from 'static-type-assert';
import { $IterableIterator } from '../../../types/$iterable';
import { $cycle } from 'iter-tools-es';

declare const Ø: never;

assert<$IterableIterator<0 | 1 | 2>>($cycle(Ø as [0, 1, 2]));

assert<
  $IterableIterator<never> | $IterableIterator<0 | 1> | $IterableIterator<string | number | boolean>
>($cycle(Ø as [] | [0, 1] | [string, number, boolean]));

assert<$IterableIterator<string | number | boolean>>(
  $cycle(Ø as [] | [0, 1] | [string, number, boolean]),
);

assert<$IterableIterator<string>>($cycle(Ø as string));

assert<$IterableIterator<0 | 1 | 2>>($cycle(Ø as Set<0 | 1 | 2>));
